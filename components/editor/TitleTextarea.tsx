import { useEffect, useRef } from "react";

export const TitleTextarea = ({ className }: { className?: string }) => {
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
        placeholder="Title..."
        maxLength={280}
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
