import isHotkey from "is-hotkey";
import { useTranslation } from "next-i18next";
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BaseSelection, Editor, Element, Transforms, Range } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";

import {
  EditorUtils,
  HoveringContainer,
  InputField,
  ToolbarButton,
} from "../..";

export const LinkInput = ({
  linkSelection,
  hide,
}: {
  linkSelection: BaseSelection;
  hide: () => void;
}) => {
  const { t } = useTranslation("editor");
  const editor = useSlateStatic();

  const [url, setUrl] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const cancel = useCallback(() => {
    if (linkSelection) {
      hide();
      ReactEditor.focus(editor);
      Transforms.select(editor, linkSelection);
    }
  }, [editor, hide, linkSelection]);

  const apply = useCallback(
    (event?: SyntheticEvent) => {
      if (linkSelection && url.length !== 0) {
        if (event) event.preventDefault();
        cancel();

        const { selection } = editor; // We have just made a selection with Transforms.select
        if (selection) {
          if (Range.isCollapsed(selection)) {
            // Edit existing link
            EditorUtils.changeLinkUrl(editor, url);
          } else {
            // Create a new link
            EditorUtils.turnIntoLink(editor, url, "middle");
          }
        }
      }
    },
    [cancel, editor, linkSelection, url]
  );

  // Called whenever link input shows/hides (indicated by linkSelection change)
  // Note: editor and hide don't cause rerenders because of useSlateStatic and hide is provided by an non-dependent useCallback from outside
  useEffect(() => {
    let handleEvent: undefined | ((event: MouseEvent) => void) = undefined;

    if (linkSelection) {
      handleEvent = (event: MouseEvent) => {
        const container = document.getElementById("hovering-container");

        if (event.target && !container!.contains(event.target as Node)) {
          hide();
        }
      };

      // Focus input
      if (inputRef.current) inputRef.current.focus();

      // Handle outside clicks (Clicks outside container cause the input to hide)
      document.addEventListener("mousedown", handleEvent);

      // Set input url if this is an active link or set it to empty string
      if (Range.isCollapsed(linkSelection)) {
        const nodeEntry = Editor.above<Element>(editor, {
          match: (n) => Element.isElement(n),
          at: linkSelection,
        });

        if (nodeEntry && nodeEntry[0].type === "link") {
          setUrl(nodeEntry[0].url);
        } else {
          setUrl("");
        }
      } else {
        setUrl("");
      }
    }

    return () => {
      if (handleEvent) document.removeEventListener("mousedown", handleEvent);
    };
  }, [editor, hide, linkSelection]);

  return (
    <HoveringContainer
      whereToShow={() => {
        return linkSelection;
      }}
      placement="bottom"
      containerProps={{
        id: "hovering-container",
      }}
    >
      <div className="flex rounded-sm border shadow-sm items-center gap-0.5 px-3 py-3 bg-white">
        <InputField
          size="sm"
          roundness="sm"
          className="w-56 mr-1"
          innerProps={{
            ref: inputRef,
            placeholder: t("link-input-placeholder"),
            defaultValue: "",
            value: url,
            onChange: (e) => setUrl(e.target.value),
            onKeyDown: (e) => {
              if (isHotkey("enter", e)) apply(e);
            },
          }}
        />

        <ToolbarButton
          tooltip={t("link-input-apply")}
          color="green"
          listener={() => {
            apply();
          }}
          tooltipPlacement="bottom"
          icon="ri:check-line"
        />

        <ToolbarButton
          tooltip={t("link-input-cancel")}
          color="red"
          listener={() => {
            cancel();
          }}
          tooltipPlacement="bottom"
          icon="ri:close-line"
        />
      </div>
    </HoveringContainer>
  );
};
