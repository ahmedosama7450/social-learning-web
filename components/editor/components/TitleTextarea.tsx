import { useEffect, useRef } from "react";

import { PropsWithClassName, PropsWithState } from "../../../lib/types";

export type TitleTextareaProps = PropsWithState<
  string,
  {
    placeholder?: string;
    maxLength?: number;
  }
>;

export const TitleTextarea = ({
  value,
  onChange: setValue,

  placeholder,
  maxLength,

  className,
}: PropsWithClassName<TitleTextareaProps>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function adjustTextareaHeight() {
    const textareaElement = textareaRef.current;
    if (textareaElement) {
      textareaElement.style.height = "5px";
      textareaElement.style.height = textareaElement.scrollHeight + "px";
    }
  }

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  return (
    <div className={className}>
      <textarea
        ref={textareaRef}
        className="block max-h-36 w-full resize-none overflow-hidden break-words border-none p-0 text-2xl font-semibold text-gray-900 placeholder-gray-900/50 focus:ring-0"
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        maxLength={maxLength}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onInput={(e) => {
          adjustTextareaHeight();
        }}
      ></textarea>
    </div>
  );
};
