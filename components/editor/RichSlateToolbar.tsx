import classNames from "classnames";
import { useTranslation } from "next-i18next";
import React from "react";
import { HistoryEditor } from "slate-history";
import { useSlateStatic } from "slate-react";

import { EditorUtils, ToolbarButton, TypicalVerticalDivider } from "..";
import { PropsWithClassName } from "../../lib/types";
import { ImagePicker } from "../foundation/forms/ImagePicker";
import { useRichSlateConfiguration } from "./hooks/useRichSlateConfiguration";

export type RichSlateToolbarProps = PropsWithClassName<{}>;

export const RichSlateToolbar = ({ className }: RichSlateToolbarProps) => {
  const { t } = useTranslation("editor");
  const editor = useSlateStatic();
  const { multipleHeadings, separator, images } = useRichSlateConfiguration();

  return (
    <div
      className={classNames(
        className,
        "bg-secondary flex items-center gap-1 border border-gray-100 px-1 py-1"
      )}
    >
      {multipleHeadings ? (
        <>
          <ToolbarButton
            tooltip={t("heading1")}
            icon="ri:h-1"
            listener={(editor) => {
              EditorUtils.toggleBlock(editor, "heading1");
            }}
            selected={(editor) => EditorUtils.isBlockActive(editor, "heading1")}
          />

          <ToolbarButton
            tooltip={t("heading2")}
            icon="ri:h-2"
            listener={(editor) => {
              EditorUtils.toggleBlock(editor, "heading2");
            }}
            selected={(editor) => EditorUtils.isBlockActive(editor, "heading2")}
          />
        </>
      ) : (
        <ToolbarButton
          tooltip={t("heading")}
          icon="ri:heading"
          listener={(editor) => {
            EditorUtils.toggleBlock(editor, "heading2");
          }}
          selected={(editor) => EditorUtils.isBlockActive(editor, "heading2")}
        />
      )}

      <ToolbarButton
        tooltip={t("quote")}
        icon="ri:double-quotes-l"
        listener={(editor) => {
          EditorUtils.toggleBlock(editor, "quote");
        }}
        selected={(editor) => EditorUtils.isBlockActive(editor, "quote")}
      />

      <ToolbarButton
        tooltip={t("code-block")}
        icon="ri:code-s-line"
        listener={(editor) => {
          EditorUtils.toggleBlock(editor, "code-block");
        }}
        selected={(editor) => EditorUtils.isBlockActive(editor, "code-block")}
      />

      <ToolbarButton
        tooltip={t("bulleted-list")}
        icon="ri:list-unordered"
        listener={(editor) => {
          EditorUtils.toggleBlock(editor, "bulleted-list");
        }}
        selected={(editor) =>
          EditorUtils.isBlockActive(editor, "bulleted-list")
        }
      />

      <ToolbarButton
        tooltip={t("numbered-list")}
        icon="ri:list-ordered"
        listener={(editor) => {
          EditorUtils.toggleBlock(editor, "numbered-list");
        }}
        selected={(editor) =>
          EditorUtils.isBlockActive(editor, "numbered-list")
        }
      />

      {(separator || images) && <TypicalVerticalDivider />}

      {separator && (
        <ToolbarButton
          tooltip={t("separator")}
          icon="ri:separator"
          listener={(editor) => {
            EditorUtils.insertSeparator(editor);
          }}
        />
      )}

      {images && (
        <ImagePicker
          onCropped={async ({ src, cropData }) => {
            EditorUtils.insertImage(editor, src, cropData);
          }}
        >
          {(openFileBrowser) => (
            <ToolbarButton
              tooltip={t("image")}
              icon="ri:image-line"
              listener={() => {
                openFileBrowser();
              }}
            />
          )}
        </ImagePicker>
      )}

      <TypicalVerticalDivider />

      <ToolbarButton
        tooltip={t("undo")}
        icon="ri:arrow-go-back-line"
        listener={(editor) => {
          HistoryEditor.undo(editor);
        }}
      />

      <ToolbarButton
        tooltip={t("redo")}
        icon="ri:arrow-go-forward-line"
        listener={(editor) => {
          HistoryEditor.redo(editor);
        }}
      />
    </div>
  );
};

/* 
{
  toolbarButtons.map((buttonProps, index) => {
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
  });
}
 */

/* const toolbarButtons = useMemo(() => {
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

    ...(separator || images ? (["divider"] as ToolbarButtonArray) : []),

    ...(separator
      ? ([
          {
            tooltip: t("separator"),
            listener: (editor) => {
              EditorUtils.insertSeparator(editor);
            },
            icon: "ri:separator",
          },
        ] as ToolbarButtonArray)
      : []),

    ...(images
      ? ([
          {
            tooltip: t("image"),
            listener: (editor) => {
              const url = window.prompt("Enter the URL of the image:");

              if (!url) {
                alert("Please, Enter a url");
              } else if (!EditorUtils.isImageUrl(url)) {
                alert("URL is not an image");
              } else {
                EditorUtils.insertImage(editor, url);
              }
            },
            icon: "ri:image-line",
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
}, [images, multipleHeadings, separator, t]);
 */

/*
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