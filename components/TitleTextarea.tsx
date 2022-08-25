import { useTranslation } from "next-i18next";
import {
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  Icon,
  PropsWithClassName,
  RegisteredUnControlledFieldProps,
} from "overwind-ui";

export type TitleTextareaProps = PropsWithClassName<
  {
    errorMsg?: string;
  } & Omit<ComponentPropsWithoutRef<"textarea">, "className">
>;

export const TitleTextarea = forwardRef<
  HTMLTextAreaElement,
  TitleTextareaProps
>(
  (
    {
      className,

      errorMsg,

      onKeyDown,
      onInput,
      ...rest
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const callbackRef = useCallback<(node: HTMLTextAreaElement) => void>(
      (node) => {
        textareaRef.current = node;

        if (ref) {
          if (typeof ref === "function") {
            ref(node);
          } else {
            // @ts-ignore
            ref.current = node;
          }
        }
      },
      [ref]
    );

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
          {...rest}
          ref={callbackRef}
          className="block max-h-36 w-full resize-none overflow-hidden break-words border-none p-0 text-2xl font-semibold text-gray-900 placeholder-gray-900/50 focus:ring-0"
          onKeyDown={(e) => {
            onKeyDown?.(e);
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          onInput={(e) => {
            onInput?.(e);
            adjustTextareaHeight();
          }}
        ></textarea>

        {errorMsg && (
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-red">
            <Icon icon="ri:error-warning-line" size="md" className="text-red" />
            {errorMsg}
          </div>
        )}
      </div>
    );
  }
);

// @ts-ignore
TitleTextarea.displayName = "TitleTextarea";

export type RegisteredTitleTextareaProps = Omit<
  TitleTextareaProps,
  "errorMsg" | "value" | "onChange" | "onBlur"
> &
  RegisteredUnControlledFieldProps;

export const RegisteredTitleTextarea = ({
  name,
  formMethods,

  ...rest
}: RegisteredTitleTextareaProps) => {
  const { t } = useTranslation();

  const errorKey = formMethods.formState.errors[name]?.message as any;

  return (
    <TitleTextarea
      {...rest}
      {...formMethods.register(name)}
      errorMsg={errorKey ? t(errorKey) : undefined}
    />
  );
};
