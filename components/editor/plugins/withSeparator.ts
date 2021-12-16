import { Editor, Element, Path, Transforms } from "slate";

import { EditorUtils } from "../utils/editor-utils";

export const withSeparator = (editor: Editor) => {
  const { isVoid, normalizeNode, deleteBackward } = editor;

  editor.isVoid = (element) => {
    return element.type === "separator" ? true : isVoid(element);
  };

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    //-------------------------------------------
    // No two separators next to one another, remove the second one
    //-------------------------------------------
    if (Element.isElement(node) && node.type === "separator") {
      try {
        const [previousNode] = Editor.node(editor, Path.previous(path));

        if (
          Element.isElement(previousNode) &&
          previousNode.type === "separator"
        ) {
          Transforms.removeNodes(editor, { at: path });
          return;
        }
      } catch (e) {}

      try {
        const [nextNode, nextPath] = Editor.node(editor, Path.next(path));

        if (Element.isElement(nextNode) && nextNode.type === "separator") {
          Transforms.removeNodes(editor, { at: nextPath });
          return;
        }
      } catch (e) {}
    }

    normalizeNode(entry);
  };

  editor.deleteBackward = (unit) => {
    //-------------------------------------------
    // Instead of deleting the separator, select it. Second time deletes it
    //-------------------------------------------
    const entry = EditorUtils.getBlockAbove(editor);

    if (entry) {
      const [node, path] = entry;

      if (Editor.isEmpty(editor, node)) {
        try {
          const [previousNode, previousPath] = Editor.node(
            editor,
            Path.previous(path)
          );

          if (
            Element.isElement(previousNode) &&
            previousNode.type === "separator"
          ) {
            Transforms.select(editor, previousPath);
            return;
          }
        } catch (e) {}
      }
    }

    deleteBackward(unit);
  };

  return editor;
};
