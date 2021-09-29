import classNames from "classnames";
import React from "react";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import { BaseButton, BaseIconProps, Icon } from "..";
import { CustomElement, ElementType, TextFormat } from "./custom-types";
import { CustomEditorUtils } from "./CustomEditor";

export interface ToolbarButtonProps {
  icon: BaseIconProps;
  listener: (editor: Editor) => void;
  selected?: (editor: Editor) => boolean;
  className?: string;
}

export const ToolbarButton = ({
  icon,
  listener,
  selected,
  className,
}: ToolbarButtonProps) => {
  const editor = useSlate();

  return (
    <BaseButton
      innerProps={{
        onMouseDown: (event: any) => {
          event.preventDefault();
          listener(editor);
        },
      }}
      className={classNames(
        className,
        "block px-2 py-1.5 rounded-sm ",
        selected && selected(editor)
          ? "bg-gray-200 hover:bg-gray-300"
          : "hover:bg-gray-100"
      )}
    >
      <Icon {...icon} size="sm" className="text-gray-600" />
    </BaseButton>
  );
};

export const ToolbarToggle = (
  props: Omit<ToolbarButtonProps, "listener" | "selected"> &
    ({ type: ElementType } | { format: TextFormat })
) => {
  const isType = "type" in props;

  return (
    <ToolbarButton
      listener={(editor) => {
        isType
          ? CustomEditorUtils.toggleBlock(editor, props.type)
          : CustomEditorUtils.toggleFormat(editor, props.format);
      }}
      selected={(editor) =>
        isType
          ? CustomEditorUtils.isBlockActive(editor, props.type)
          : CustomEditorUtils.isFormatActive(editor, props.format)
      }
      {...props}
    />
  );
};
