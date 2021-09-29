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
import { CustomEditorUtils } from "../components/editor/CustomEditor";

// @refresh reset
const Test = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];
  const [value, setValue] = useState<Descendant[]>(initialValue);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
    >
      <div>
        <button
          onMouseDown={() => {
            CustomEditorUtils.toggleFormat(editor, "bold");
          }}
        >
          Bold
        </button>
      </div>
      <Editable
        renderLeaf={({ children, attributes, leaf, text }) => {
          return (
            <span
              style={{ fontWeight: leaf.bold ? "bold" : "normal" }}
              {...attributes}
            >
              {children}
            </span>
          );
        }}
        className="px-2 py-3 prose prose-lg"
        placeholder="Start your discussion..."
      />
    </Slate>
  );
};

export default Test;
