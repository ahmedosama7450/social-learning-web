import classNames from "classnames";
import { useCallback, useState } from "react";
import scrollIntoView from "scroll-into-view-if-needed";
import {
  BaseSelection,
  createEditor,
  Descendant,
  Editor,
  Element,
  NodeEntry,
  Range as SlateRange,
  Text,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";

import {
  BallonToolbar,
  EditorUtils,
  LinkInput,
  LinkToolbar,
  TitleTextarea,
  TitleTextareaProps,
  Toolbar,
  withBlocks,
  withLinks,
  withLists,
  withMarkdownShortcuts,
  withMarks,
  withSeparator,
  withTrailingBlock,
  withImages,
  withVoids,
} from "..";
import { PropsWithClassName, PropsWithState } from "../../lib/types";
import { useConstant } from "../hooks/useConstant";
import { renderElement } from "./renderers/renderElement";
import { renderLeaf } from "./renderers/renderLeaf";
import { handleBreakKeys } from "./utils/handleBreakKeys";
import { handleHotkeys } from "./utils/handleHotkeys";

export type RichEditorProps = PropsWithClassName<
  PropsWithState<
    Descendant[],
    {
      placeholder?: string;

      configuration: {
        structure: "main" | "secondary";
        multipleHeadings: boolean;
        separator: boolean;
        images: boolean;
      };

      titleTextareaProps?: TitleTextareaProps;
    }
  >
>;

export const RichEditor = ({
  className,

  value,
  onChange: setValue,

  placeholder,
  configuration,
  titleTextareaProps,
}: RichEditorProps) => {
  const editor = useConstant(() => {
    let plugins = withBlocks(
      withMarks(
        withTrailingBlock(
          withMarkdownShortcuts(
            withLinks(withLists(withHistory(withReact(createEditor()))))
          )
        )
      )
    );

    if (configuration.separator) {
      plugins = withSeparator(plugins);
    }

    if (configuration.images) {
      plugins = withImages(plugins);
    }

    if (configuration.separator || configuration.images) {
      plugins = withVoids(plugins);
    }

    return plugins;
  });

  // TODO I am not sure which one to use, useMemo vs useConstant. needs more research
  /* const editor = useMemo(// Code here, [configuration.images, configuration.separator]); */

  const [linkInputSelection, setLinkInputSelection] =
    useState<BaseSelection>(null);

  const showLinkInput = useCallback(() => {
    setLinkInputSelection(editor.selection);
  }, [editor.selection]);

  const hideLinkInput = useCallback(() => {
    setLinkInputSelection(null);
  }, []);

  const decorate = useCallback(
    ([node, path]: NodeEntry) => {
      /*
        LinkInput takes focus so, editor selection is lost
        We use a decorator to mark the selection
      */
      if (
        linkInputSelection &&
        Text.isText(node) &&
        SlateRange.includes(linkInputSelection, path)
      ) {
        if (SlateRange.isCollapsed(linkInputSelection)) {
          // Try to find a link, and mark it as selection from start to end
          const linkElement = Editor.above(editor, {
            at: linkInputSelection,
            match: (n) => Element.isElement(n) && n.type === "link",
          });

          if (linkElement) {
            const [, path] = linkElement;
            return [
              {
                anchor: Editor.start(editor, path),
                focus: Editor.end(editor, path),
                selectionHighlight: true,
              },
            ];
          }
        } else {
          return [
            {
              ...linkInputSelection,
              selectionHighlight: true,
            },
          ];
        }
      }

      return [];
    },
    [editor, linkInputSelection]
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
    >
      <div className={classNames(className, "flex flex-col")}>
        <BallonToolbar showLinkInput={showLinkInput} />
        <LinkToolbar showLinkInput={showLinkInput} />
        <LinkInput linkSelection={linkInputSelection} hide={hideLinkInput} />

        <Toolbar configuration={configuration} />

        <div
          className={classNames("grow py-3", {
            "px-1.5": configuration.structure === "main",
            "borer-b rounded-b border-r border-l border-gray-100 px-3":
              configuration.structure === "secondary",
          })}
        >
          {titleTextareaProps && <TitleTextarea {...titleTextareaProps} />}

          <Editable
            className="prose 2xl:prose-lg prose-primary mt-3 max-w-none"
            style={{ wordBreak: "break-word" }}
            placeholder={placeholder}
            spellCheck={false}
            autoCorrect="false"
            autoCapitalize="false"
            decorate={decorate}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onDOMBeforeInput={(event: InputEvent) => {
              // TODO Do we really need this ??
              switch (event.inputType) {
                case "formatBold":
                  event.preventDefault();
                  return EditorUtils.toggleMark(editor, "bold");
                case "formatItalic":
                  event.preventDefault();
                  return EditorUtils.toggleMark(editor, "italic");
              }
            }}
            onKeyDown={(event) => {
              if (handleHotkeys(editor, showLinkInput, event)) return;
              if (handleBreakKeys(editor, event)) return;
            }}
            scrollSelectionIntoView={(_editor, domRange) => {
              // Don't scroll into images, back to default if not an image
              let isImage = false;
              if (
                editor.selection &&
                SlateRange.isCollapsed(editor.selection)
              ) {
                const [match] = Editor.nodes(editor, {
                  match: (n) => Element.isElement(n) && n.type === "image",
                  voids: true, // TODO removing this doesn't change result, I guess. Why ??
                });

                isImage = !!match;
              }

              if (!isImage) {
                defaultScrollSelectionIntoView(editor, domRange);
              }
            }}
          />
        </div>
      </div>
    </Slate>
  );
};

// TODO Taken from slate source code as It's not exported. Make a PR to export it
const defaultScrollSelectionIntoView = (
  editor: ReactEditor,
  domRange: Range
) => {
  // This was affecting the selection of multiple blocks and dragging behavior,
  // so enabled only if the selection has been collapsed.
  if (
    !editor.selection ||
    (editor.selection && SlateRange.isCollapsed(editor.selection))
  ) {
    const leafEl = domRange.startContainer.parentElement!;
    leafEl.getBoundingClientRect =
      domRange.getBoundingClientRect.bind(domRange);
    scrollIntoView(leafEl, {
      scrollMode: "if-needed",
    });
    //@ts-ignore
    delete leafEl.getBoundingClientRect;
  }
};
