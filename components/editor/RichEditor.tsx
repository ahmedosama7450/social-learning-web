import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import {
  BaseSelection,
  createEditor,
  Descendant,
  Editor,
  Element,
  NodeEntry,
  Range,
  Text,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

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
} from "..";
import { PropsWithClassName, StateDispatcher } from "../../lib/types";
import { renderElement } from "./renderElement";
import { renderLeaf } from "./renderLeaf";
import { handleBreakKeys } from "./utils/handleBreakKeys";
import { handleHotkeys } from "./utils/handleHotkeys";

export type RichEditorProps = PropsWithClassName<{
  value: Descendant[];
  onChange: StateDispatcher<Descendant[]>;
  placeholder?: string;

  configuration: {
    structure: "main" | "secondary";
    multipleHeadings: boolean;
    separator: boolean;
  };

  titleTextareaProps?: TitleTextareaProps;
}>;

// @refresh reset
export const RichEditor = ({
  value,
  onChange: setValue,
  placeholder,

  configuration,

  titleTextareaProps,

  className,
}: RichEditorProps) => {
  const editor = useMemo(() => {
    const plugins = withBlocks(
      withMarks(
        withTrailingBlock(
          withMarkdownShortcuts(
            withLinks(withLists(withHistory(withReact(createEditor()))))
          )
        )
      )
    );

    return configuration.separator ? withSeparator(plugins) : plugins;
  }, [configuration.separator]);

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
        Range.includes(linkInputSelection, path)
      ) {
        if (Range.isCollapsed(linkInputSelection)) {
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
          className={classNames("flex-grow py-3", {
            "px-1.5": configuration.structure === "main",
            "px-3 border-r border-l borer-b rounded-b border-gray-100":
              configuration.structure === "secondary",
          })}
        >
          {titleTextareaProps && <TitleTextarea {...titleTextareaProps} />}

          <Editable
            className="mt-3 prose max-w-none 2xl:prose-lg prose-primary"
            style={{ wordBreak: "break-word" }}
            placeholder={placeholder}
            spellCheck={false}
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
          />
        </div>
      </div>
    </Slate>
  );
};
