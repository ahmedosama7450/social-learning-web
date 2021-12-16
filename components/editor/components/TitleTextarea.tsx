import { useEffect, useRef } from "react";

import { PropsWithClassName, StateDispatcher } from "../../../lib/types";

export type TitleTextareaProps = {
  value: string;
  onChange: StateDispatcher<string>;

  placeholder?: string;
  maxLength?: number;
};

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
        className="block w-full p-0 overflow-hidden text-2xl font-semibold text-gray-900 break-words border-none resize-none placeholder-gray-900/50 focus:ring-0 max-h-36"
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
