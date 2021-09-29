import React, { useRef, useEffect, ReactNode } from "react";
import { useSlate, ReactEditor } from "slate-react";
import { Editor, Range } from "slate";
import { createPortal } from "react-dom";
import { CustomElement, TextFormat } from "./custom-types";
import { BaseButton, BaseIconProps, Icon } from "..";
import { CustomEditorUtils } from "./CustomEditor";
import classNames from "classnames";
import { ToolbarButton, ToolbarToggle } from "./ToolbarButton";

export const BallonToolbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection || domSelection.rangeCount < 1) return;

    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return (
    <Portal>
      <div
        ref={ref}
        className="absolute z-20 top-[-10000px] left-[-10000px] -mt-2 opacity-0 bg-gray-50 rounded-sm border shadow-sm transition-opacity duration-75"
      >
        <div className="flex items-center gap-1 px-1 py-1">
          {formatButtons.map((buttonProps) =>
            buttonProps === "divider" ? (
              <div className="w-px h-6 bg-gray-200"></div>
            ) : (
              <ToolbarToggle {...buttonProps} />
            )
          )}

          <ToolbarButton
            listener={() => {
              const url = window.prompt("Enter the URL of the link:");
              if (!url) return;
              CustomEditorUtils.insertLink(editor, url);

              // TODO Function to remove link, use it later
              function removeLink() {
                if (CustomEditorUtils.isLinkActive(editor)) {
                  CustomEditorUtils.unwrapLink(editor);
                }
              }
            }}
            selected={(editor) => CustomEditorUtils.isLinkActive(editor)}
            icon={{
              customIcon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"
                    fill="currentColor"
                  />
                </svg>
              ),
            }}
          />
          <ToolbarButton
            listener={() => {}}
            icon={{
              customIcon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12.651 14.065L11.605 20H9.574l1.35-7.661-7.41-7.41L4.93 3.515 20.485 19.07l-1.414 1.414-6.42-6.42zm-.878-6.535l.27-1.53h-1.8l-2-2H20v2h-5.927L13.5 9.257 11.773 7.53z"
                    fill="currentColor"
                  />
                </svg>
              ),
            }}
          />
        </div>
      </div>
    </Portal>
  );
};

const formatButtons: (
  | { icon: BaseIconProps; format: TextFormat }
  | "divider"
)[] = [
  {
    format: "bold",
    icon: {
      customIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  },

  {
    format: "italic",
    icon: {
      customIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  },
  {
    format: "underlined",
    icon: {
      customIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  },
  {
    format: "strikeThrough",
    icon: {
      customIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  },
  "divider",
  {
    format: "superscript",
    icon: {
      customIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M11 7v13H9V7H3V5h12v2h-4zm8.55-.42a.8.8 0 1 0-1.32-.36l-1.154.33A2.001 2.001 0 0 1 19 4a2 2 0 0 1 1.373 3.454L18.744 9H21v1h-4V9l2.55-2.42z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  },
  {
    format: "subscript",
    icon: {
      customIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M11 6v13H9V6H3V4h14v2h-6zm8.55 10.58a.8.8 0 1 0-1.32-.36l-1.154.33A2.001 2.001 0 0 1 19 14a2 2 0 0 1 1.373 3.454L18.744 19H21v1h-4v-1l2.55-2.42z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  },
  "divider",
  {
    format: "code",
    icon: {
      customIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M16.95 8.464l1.414-1.414 4.95 4.95-4.95 4.95-1.414-1.414L20.485 12 16.95 8.464zm-9.9 0L3.515 12l3.535 3.536-1.414 1.414L.686 12l4.95-4.95L7.05 8.464z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  },
  {
    format: "highlighted",
    icon: {
      customIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M15.246 14H8.754l-1.6 4H5l6-15h2l6 15h-2.154l-1.6-4zm-.8-2L12 5.885 9.554 12h4.892zM3 20h18v2H3v-2z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  },
  "divider",
];

export const Portal = ({ children }: { children: ReactNode }) => {
  return typeof document === "object"
    ? createPortal(children, document.body)
    : null;
};
