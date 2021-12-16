import classNames from "classnames";
import { useTranslation } from "next-i18next";
import React, { useMemo } from "react";
import { HistoryEditor } from "slate-history";

import {
  EditorUtils,
  ToggleableBlockType,
  BaseToolbarButtonProps,
  ToolbarButton,
  ToolbarButtonProps,
  RichEditorProps,
} from "../..";

export const Toolbar = ({
  configuration: { structure, multipleHeadings, separator },
}: Pick<RichEditorProps, "configuration">) => {
  const { t } = useTranslation("editor");

  const toolbarButtons = useMemo(() => {
    type ToolbarButtonArray = (
      | ToolbarButtonProps
      | (BaseToolbarButtonProps & {
          type: ToggleableBlockType;
        })
      | "divider"
    )[];

    const buttons: ToolbarButtonArray = [
      ...(multipleHeadings
        ? ([
            {
              type: "heading1",
              tooltip: t("heading1"),
              icon: "ri:h-1",
            },
            {
              type: "heading2",
              tooltip: t("heading2"),
              icon: "ri:h-2",
            },
          ] as ToolbarButtonArray)
        : ([
            {
              type: "heading2",
              tooltip: t("heading"),
              icon: "ri:heading",
            },
          ] as ToolbarButtonArray)),

      {
        type: "quote",
        tooltip: t("quote"),
        icon: "ri:double-quotes-l",
      },
      {
        type: "code-block",
        tooltip: t("code-block"),
        icon: "ri:code-s-line",
      },
      {
        type: "bulleted-list",
        tooltip: t("bulleted-list"),
        icon: "ri:list-unordered",
      },
      {
        type: "numbered-list",
        tooltip: t("numbered-list"),
        icon: "ri:list-ordered",
      },

      ...(separator
        ? ([
            "divider",

            {
              tooltip: t("separator"),
              listener: (editor) => {
                EditorUtils.insertSeparator(editor);
              },
              icon: "ri:separator",
            },
          ] as ToolbarButtonArray)
        : []),

      "divider",

      {
        tooltip: t("undo"),
        listener: (editor) => {
          HistoryEditor.undo(editor);
        },
        icon: "ri:arrow-go-back-line",
      },
      {
        tooltip: t("redo"),
        listener: (editor) => {
          HistoryEditor.redo(editor);
        },
        icon: "ri:arrow-go-forward-line",
      },
    ];

    return buttons;
  }, [multipleHeadings, separator, t]);

  return (
    <div
      className={classNames("z-40", {
        "sticky bg-white pt-[var(--navbar-margin-bottom)] top-[var(--navbar-height)]":
          structure === "main",
      })}
    >
      <div
        className={classNames(
          "flex items-center gap-1 px-1 py-1 border border-gray-100 bg-secondary",
          {
            "rounded-lg": structure === "main",
            "rounded-t": structure === "secondary",
          }
        )}
      >
        {toolbarButtons.map((buttonProps, index) => {
          if (buttonProps === "divider") {
            return <div key={index} className="w-px h-6 bg-gray-200"></div>;
          } else if ("type" in buttonProps) {
            const { type, ...rest } = buttonProps;

            return (
              <ToolbarButton
                key={index}
                listener={(editor) => {
                  EditorUtils.toggleBlock(editor, type);
                }}
                selected={(editor) => EditorUtils.isBlockActive(editor, type)}
                {...rest}
              />
            );
          } else {
            return <ToolbarButton key={index} {...buttonProps} />;
          }
        })}
      </div>
    </div>
  );
};

/*
  {
    tooltip: "Image",
    listener: () => {
      // TODO Insert image
    },
    icon: "ri:image-line",
  },
  {
    tooltip: "Math Formula",
    listener: () => {
      // TODO Math formula not implemented
    },
    icon: "ri:functions",
  },
  {
    tooltip: "Special Characters",
    listener: () => {
      // TODO Special characters not implemented
    },
    icon: "ri:omega",
  },
*/
