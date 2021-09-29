import {
  BaseEditor,
  Element,
  Text,
  Node,
  Editor,
  Transforms,
  Range,
  createEditor,
  Descendant,
} from "slate";

import { CustomElement } from "./custom-types";
import { LinkElement } from "./custom-types";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const CustomEditorUtils = {
  isSelectionAtBlockStart(editor: Editor) {
    const path = CustomEditorUtils.getBlockAbove(editor)?.[1];

    const point = editor.selection?.focus;

    return !!path && !!point && Editor.isStart(editor, point, path);
  },

  isSelectionAtBlockEnd(editor: Editor) {
    const path = CustomEditorUtils.getBlockAbove(editor)?.[1];

    const point = editor.selection?.focus;

    return !!path && !!point && Editor.isEnd(editor, point, path);
  },

  getBlockAbove(editor: Editor) {
    return Editor.above(editor, {
      match: (n) => {
        return Editor.isBlock(editor, n);
      },
    });
  },

  //=======================================
  insertLink(editor: Editor, url: string) {
    if (editor.selection) {
      CustomEditorUtils.wrapLink(editor, url);
    }
  },

  isLinkActive(editor: Editor) {
    const [link] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
    });
    return !!link;
  },

  unwrapLink(editor: Editor) {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
    });
  },

  wrapLink(editor: Editor, url: string) {
    if (CustomEditorUtils.isLinkActive(editor)) {
      CustomEditorUtils.unwrapLink(editor);
    }

    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const link: LinkElement = {
      type: "link",
      url,
      children: isCollapsed ? [{ text: url }] : [],
    };

    if (isCollapsed) {
      Transforms.insertNodes(editor, link);
    } else {
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: "end" });
    }
  },

  //================================================
  toggleFormat: (editor: Editor, format: string) => {
    const isActive = CustomEditorUtils.isFormatActive(editor, format);
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true },
      { match: Text.isText, split: true }
    );
  },

  isFormatActive: (editor: Editor, format: string) => {
    //@ts-ignore
    const [match] = Editor.nodes(editor, {
      //@ts-ignore
      match: (n) => n[format] === true,
      mode: "all",
    });
    return !!match;
  },

  //=================================================
  isBlockActive: (editor: Editor, type: CustomElement["type"]) => {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === type,
    }) as any;

    return !!match;
  },

  toggleBlock: (editor: Editor, newType: CustomElement["type"]) => {
    const isActive = CustomEditorUtils.isBlockActive(editor, newType);
    const isList = LIST_TYPES.includes(newType);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        LIST_TYPES.includes(
          // @ts-ignore
          !Editor.isEditor(n) && Element.isElement(n) && n.type
        ),
      split: true,
    });

    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : isList ? "list-item" : newType,
    });

    if (!isActive && isList) {
      // const block = { type: type, children: [] };
      Transforms.wrapNodes(editor, { type: "bulleted-list", children: [] });
    }
  },

  toggleMark: (editor: Editor, format: CustomElement["type"]) => {
    const isActive = CustomEditorUtils.isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },

  isMarkActive: (editor: Editor, format: CustomElement["type"]) => {
    const marks = Editor.marks(editor) as any;
    return marks ? marks[format] === true : false;
  },

  //=============================================
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Text.isText(n) && n.bold === true,
      universal: true,
    }) as any;

    return !!match;
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === "code-block",
    }) as any;

    return !!match;
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditorUtils.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditorUtils.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : "code-block" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};
