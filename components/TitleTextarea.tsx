import { useTranslation } from "next-i18next";
import { ComponentPropsWithRef, useEffect, useRef } from "react";

import {
  PropsWithClassName,
  RegisteredUnControlledFieldProps,
} from "../lib/types";
import { Icon } from "./foundation/Icon";

export type TitleTextareaProps = PropsWithClassName<
  {
    placeholder?: string;
    maxLength?: number;
    errorMsg?: string;
  } & Pick<
    ComponentPropsWithRef<"textarea">,
    "ref" | "value" | "onChange" | "onBlur"
  >
>;

export const TitleTextarea = ({
  className,

  placeholder,
  maxLength,
  errorMsg,

  ref,
  ...rest
}: TitleTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  useEffect(() => {
    if (ref) {
      // @ts-ignore
      textareaRef.current = ref.current;
    }
  }, [ref]);

  return (
    <div className={className}>
      <textarea
        {...rest}
        ref={ref || textareaRef}
        className="block max-h-36 w-full resize-none overflow-hidden break-words border-none p-0 text-2xl font-semibold text-gray-900 placeholder-gray-900/50 focus:ring-0"
        placeholder={placeholder}
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
      {errorMsg && (
        <div className="text-red mt-1.5 flex items-center gap-1.5 text-sm">
          <Icon icon="ri:error-warning-line" size="md" className="text-red" />
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export type RegisteredTitleTextareaProps = Omit<
  TitleTextareaProps,
  "errorMsg" | "ref" | "value" | "onChange" | "onBlur"
> &
  RegisteredUnControlledFieldProps;

export const RegisteredTitleTextarea = ({
  name,
  formMethods,

  ...rest
}: RegisteredTitleTextareaProps) => {
  const { t } = useTranslation();

  const errorKey = formMethods.formState.errors[name]?.message;

  return (
    <TitleTextarea
      {...rest}
      {...formMethods.register(name)}
      errorMsg={errorKey ? t(errorKey) : undefined}
    />
  );
};
