import Tippy, { TippyProps } from "@tippyjs/react";
import classNames from "classnames";
import { Editor } from "slate";
import { useSlate } from "slate-react";

import { BaseButton, IconIdentifier, Icon } from "../..";
import { PropsWithClassName } from "../../../lib/types";

export type BaseToolbarButtonProps = PropsWithClassName<{
  icon: IconIdentifier;
  tooltip: string;
  tooltipPlacement?: TippyProps["placement"];
  color?: "gray" | "green" | "red";
}>;

export type ToolbarButtonProps = BaseToolbarButtonProps & {
  disabled?: (editor: Editor) => boolean;
  listener: (editor: Editor) => void;
  selected?: (editor: Editor) => boolean;
};

export const ToolbarButton = ({
  icon,
  tooltip,
  tooltipPlacement = "top",
  color = "gray",
  className,

  disabled,
  listener,
  selected,
}: ToolbarButtonProps) => {
  const editor = useSlate();

  return (
    <Tippy content={tooltip} placement={tooltipPlacement}>
      <BaseButton
        type="button"
        onClick={(event) => {
          event.preventDefault();
          listener(editor);
        }}
        innerProps={{
          onMouseDown: (event) => {
            event.preventDefault();
          },
          disabled: disabled ? disabled(editor) : undefined,
        }}
        className={classNames(
          className,
          "block px-2 py-1.5 rounded-sm",

          (disabled ? disabled(editor) : !!disabled)
            ? "hover:bg-gray-100"
            : selected && selected(editor)
            ? "bg-gray-200 hover:bg-gray-300"
            : "hover:bg-gray-100"
        )}
      >
        <Icon
          icon={icon}
          size="sm"
          className={classNames({
            "text-gray-600": color === "gray",
            "text-green-600": color === "green",
            "text-red-600": color === "red",
          })}
        />
      </BaseButton>
    </Tippy>
  );
};
