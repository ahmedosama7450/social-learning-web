import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  BaseEditor,
  Element as SlateElement,
  Text,
  Node,
  Point,
  Editor,
  Range,
  Transforms,
  createEditor,
  Descendant,
  Path,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
  ReactEditor,
} from "slate-react";
import { HistoryEditor, withHistory } from "slate-history";

import isUrl from "is-url-superb";

import classNames from "classnames";

import isHotkey from "is-hotkey";

import { Toolbar } from "./Toolbar";
import { TitleTextarea } from "./TitleTextarea";
import { CustomElement, ElementType } from "./custom-types";
import { CustomEditorUtils } from "./CustomEditor";
import { BallonToolbar } from "./BallonToolbar";

import { withLinks, withListItems, withShortcuts } from "./plugins";
import { BaseField } from "..";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

// @refresh reset
export const DiscussionEditor = ({ className }: { className?: string }) => {
  const editor = useMemo(
    () =>
      withShortcuts(
        withLinks(withListItems(withHistory(withReact(createEditor()))))
      ),
    []
  );

  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  useEffect(() => {
    const contentString = localStorage.getItem("content");
    if (contentString) {
      setValue(JSON.parse(contentString));
    }
  }, []);

  const renderElement = useCallback(
    ({ element, attributes, children }: RenderElementProps) => {
      switch (element.type) {
        case "heading1":
          return <h3 {...attributes}>{children}</h3>;
        case "heading2":
          return <h4 {...attributes}>{children}</h4>;
        case "quote":
          return <blockquote {...attributes}>{children}</blockquote>;
        case "code-block":
          return (
            <pre {...attributes}>
              <code>{children}</code>
            </pre>
          );
        case "bulleted-list":
          return <ul {...attributes}>{children}</ul>;
        case "numbered-list":
          return <ol {...attributes}>{children}</ol>;
        case "list-item":
          return <li {...attributes}>{children}</li>;
        case "link":
          return (
            <a {...attributes} href={element.url}>
              {children}
            </a>
          );
        default:
          return <p {...attributes}>{children}</p>;
      }
    },
    []
  );

  const renderLeaf = useCallback(
    ({ attributes, children, leaf, text }: RenderLeafProps) => {
      if (leaf.code) {
        return <code {...attributes}>{children}</code>;
      }

      if (leaf.bold) {
        children = <strong>{children}</strong>;
      }

      if (leaf.italic) {
        children = <em>{children}</em>;
      }

      if (leaf.underlined) {
        children = <u>{children}</u>;
      }

      if (leaf.strikeThrough) {
        children = <s>{children}</s>;
      }

      if (leaf.superscript) {
        children = <sup>{children}</sup>;
      } else if (leaf.subscript) {
        children = <sub>{children}</sub>;
      }

      return (
        <span
          className={leaf.highlighted ? "bg-yellow-200" : undefined}
          {...attributes}
        >
          {children}
        </span>
      );
    },
    []
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);

        const content = JSON.stringify(value);
        localStorage.setItem("content", content);
      }}
    >
      <div className={className}>
        <BallonToolbar />
        <Toolbar className="mb-4" />
        <TitleTextarea className="px-1" />
        <Editable
          className="px-2 py-3 prose prose-lg"
          placeholder="Start your discussion..."
          spellCheck={false}
          autoFocus
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onDOMBeforeInput={(event: InputEvent) => {
            switch (event.inputType) {
              case "formatBold":
                event.preventDefault();
                return CustomEditorUtils.toggleFormat(editor, "bold");
              case "formatItalic":
                event.preventDefault();
                return CustomEditorUtils.toggleFormat(editor, "italic");
              case "formatUnderline":
                event.preventDefault();
                return CustomEditorUtils.toggleFormat(editor, "underlined");
            }
          }}
          onKeyDown={(event) => {
            const blockEntry = CustomEditorUtils.getBlockAbove(editor);

            if (blockEntry) {
              const blockElement = blockEntry[0] as SlateElement;

              //---------------------
              // Soft Break
              //---------------------
              if (
                isHotkey("enter", event) &&
                (blockElement.type === "quote" ||
                  blockElement.type === "code-block")
              ) {
                event.preventDefault();
                editor.insertText("\n");
              }

              //----------------------
              // Exit Break
              //----------------------
              if (
                editor.selection &&
                ((isHotkey("mod+enter", event) &&
                  (blockElement.type === "quote" ||
                    blockElement.type === "code-block")) ||
                  (isHotkey("enter", event) &&
                    (blockElement.type === "heading1" ||
                      blockElement.type === "heading2" ||
                      blockElement.type === "heading3")))
              ) {
                let isEdge = false,
                  isStart = false;
                if (CustomEditorUtils.isSelectionAtBlockStart(editor)) {
                  isEdge = true;
                  isStart = true;
                }
                if (CustomEditorUtils.isSelectionAtBlockEnd(editor)) {
                  isEdge = true;
                }

                if (isEdge) {
                  if (Range.isExpanded(editor.selection))
                    editor.deleteFragment();

                  event.preventDefault();

                  const selectionPath = Editor.path(editor, editor.selection);

                  let insertPath;
                  const level = 0;
                  if (isStart) {
                    insertPath = selectionPath.slice(0, level + 1);
                  } else {
                    insertPath = Path.next(selectionPath.slice(0, level + 1));
                  }

                  Transforms.insertNodes(
                    editor,
                    { type: "paragraph", children: [{ text: "" }] },
                    {
                      at: insertPath,
                      select: !isStart,
                    }
                  );
                }
              }
            }

            //----------------------
            // Formatting shortcuts
            //----------------------
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
                CustomEditorUtils.toggleMark(editor, mark as any);
              }
            }
          }}
        />
      </div>
    </Slate>
  );
};
