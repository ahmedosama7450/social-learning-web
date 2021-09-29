import classNames from "classnames";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "next-i18next";

export type BaseFieldType = "input" | "textarea" | "select";

export interface BaseFieldProps<T extends BaseFieldType> {
  /** You could still use input type (in inputFieldProps) along with this */
  fieldType: T;

  /**
   * Notes:
   * Use className in here to add padding in case of addons (pl-7 / pr-7 is mostly fine for icons)
   * In case of using a label, you should set an id // TODO maybe I should make this automatic in the future
   */
  innerProps?: React.ComponentPropsWithRef<T>;

  // TODO I will probably enable this again because it looks so wordy without it
  /* children?: React.ReactNode // Children are only used with select type (as a shortcut to inputFieldProps.children) */

  label?: string;
  extraText?: string;
  errorMsg?: string;
  helperText?: string;
  greenHelperText?: boolean;

  className?: string;
  /** Remove shadow */
  flat?: boolean;
  borderless?: boolean;
  /** Adds background color */
  filled?: boolean;
  roundedFull?: boolean;
  large?: boolean;

  leadingAddonProps?: BaseFieldAddonProps;
  trailingAddonProps?: BaseFieldAddonProps;
}

export const BaseField = <T extends BaseFieldType>({
  fieldType,
  innerProps,

  label,
  extraText,
  errorMsg,
  helperText,
  greenHelperText = false,

  className,
  flat = true,
  borderless = false,
  filled = false,
  roundedFull = false,
  /** Increases input height */
  large = false,

  leadingAddonProps,
  trailingAddonProps,
}: BaseFieldProps<T>) => {
  const inputFieldClassName = classNames(
    "flex-1 w-full sm:text-sm z-10 focus:outline-none",

    filled ? "bg-blueGray-100 focus:bg-blueGray-50 focus:ring-0" : "bg-white",

    {
      "py-3": large,
      "border-0": borderless,

      "pr-7": errorMsg && fieldType === "input" && !trailingAddonProps,
      "form-error": !!errorMsg,
      "form-normal": !errorMsg,

      [roundedFull ? "form-rounded-full" : "form-rounded"]:
        !leadingAddonProps?.isDetached && !trailingAddonProps?.isDetached,
      [roundedFull ? "form-rounded-r-full" : "form-rounded-r"]:
        leadingAddonProps?.isDetached && !trailingAddonProps?.isDetached,
      [roundedFull ? "form-rounded-l-full" : "form-rounded-l"]:
        trailingAddonProps?.isDetached && !leadingAddonProps?.isDetached,
    }
  );

  return (
    <div className={className}>
      {/* TODO You might want to turn this into a component and reuse it in CustomSelectField */}
      {label &&
        (extraText ? (
          <div className="flex items-center justify-between mb-1">
            <label htmlFor={innerProps?.id} className="form-label">
              {label}
            </label>
            <span className="text-sm text-gray-400">{extraText}</span>
          </div>
        ) : (
          <label
            htmlFor={innerProps?.id}
            className="block mb-1 w-max form-label"
          >
            {label}
          </label>
        ))}

      <div
        className={classNames("relative flex", {
          "shadow-sm": !flat,

          "form-rounded": !roundedFull,
          "form-rounded-full": roundedFull,
        })}
      >
        {leadingAddonProps && (
          <BaseFieldAddon
            {...leadingAddonProps}
            className={classNames(leadingAddonProps.className, {
              "left-0": !leadingAddonProps.isDetached,
              "border-r-0": leadingAddonProps.isDetached,
              "form-rounded-l": !roundedFull,
              "form-rounded-l-full": roundedFull,
            })}
          />
        )}

        {fieldType === "input" ? (
          <input
            type="text" // This is necessary to make tailwind forms plugin work. Can be overridden in inputFieldProps
            {...(innerProps as React.ComponentPropsWithRef<"input">)}
            className={classNames(inputFieldClassName, innerProps?.className)}
          />
        ) : fieldType === "textarea" ? (
          <textarea
            {...(innerProps as React.ComponentPropsWithRef<"textarea">)}
            className={classNames(inputFieldClassName, innerProps?.className)}
          />
        ) : (
          <select
            {...(innerProps as React.ComponentPropsWithRef<"select">)}
            className={classNames(inputFieldClassName, innerProps?.className)}
          />
        )}

        {trailingAddonProps ? (
          <BaseFieldAddon
            {...trailingAddonProps}
            className={classNames(trailingAddonProps.className, {
              "right-0": !trailingAddonProps.isDetached,
              "border-l-0": trailingAddonProps.isDetached,
              "form-rounded-r": !roundedFull,
              "form-rounded-r-full": roundedFull,
            })}
          />
        ) : (
          errorMsg &&
          fieldType === "input" && (
            <BaseFieldAddon
              addon={<ExclamationCircleIcon className="w-5 h-5 text-error" />}
              className="right-0 pr-2"
            />
          )
        )}
      </div>

      {/* TODO You might want to turn this into a component and reuse it in CustomSelectField */}
      {errorMsg ? (
        <p className="mt-1.5 text-sm text-error">{errorMsg}</p>
      ) : (
        helperText && (
          <p
            className={classNames("mt-1.5 text-sm", {
              "text-gray-500": !greenHelperText,
              "text-green-600": greenHelperText,
            })}
          >
            {helperText}
          </p>
        )
      )}
    </div>
  );
};

interface BaseFieldAddonProps {
  addon: React.ReactNode;
  /** Use this to add left and right padding (pl-3 (pr-3) or pl-2 (pr-2) is mostly fine for icons, px-3 for detached icons) */
  className?: string;
  pointerEventsEnabled?: boolean;
  isDetached?: boolean;
}

const BaseFieldAddon = ({
  addon,
  className,
  pointerEventsEnabled = false,
  isDetached = false,
}: BaseFieldAddonProps) => {
  return (
    <div
      className={classNames(className, {
        "pointer-events-none": !pointerEventsEnabled,
        "absolute z-20 inset-y-0 flex items-center": !isDetached,
        "inline-flex items-center border border-gray-300 bg-gray-50 text-gray-500 text-sm z-0":
          isDetached,
      })}
    >
      {addon}
    </div>
  );
};

//----------------------------------------------------------------------------------

type RegisteredBaseFieldProps<T extends BaseFieldType> = Omit<
  BaseFieldProps<T>,
  "error"
> & {
  name: string;
  formMethods: UseFormReturn<any>;
};

const RegisteredBaseField = <T extends BaseFieldType>({
  name,
  formMethods,
  innerProps,
  ...rest
}: RegisteredBaseFieldProps<T>) => {
  const { t } = useTranslation();

  const fieldRegister = formMethods.register(name);

  const errorKey = formMethods.formState.errors[name]?.message;

  return (
    <BaseField
      {...rest}
      errorMsg={errorKey ? t(errorKey) : undefined}
      innerProps={{
        ...(innerProps as any),

        name: fieldRegister.name,
        ref: fieldRegister.ref,

        onChange: (
          e: any /*Using any as we don't care about the typing, anyway*/
        ) => {
          fieldRegister.onChange(e);
          if (innerProps?.onChange) innerProps.onChange(e);
        },
        onBlur: (
          e: any /*Using any as we don't care about the typing, anyway*/
        ) => {
          fieldRegister.onBlur(e);
          if (innerProps?.onBlur) innerProps.onBlur(e);
        },
      }}
    />
  );
};

type FinalRegisteredBaseFieldProps<T extends BaseFieldType> = Omit<
  RegisteredBaseFieldProps<T>,
  "fieldType"
>;

export const RegisteredInputField = (
  props: FinalRegisteredBaseFieldProps<"input">
) => {
  return <RegisteredBaseField fieldType="input" {...props} />;
};

export const RegisteredSelectField = (
  props: FinalRegisteredBaseFieldProps<"select">
) => {
  return <RegisteredBaseField fieldType="select" {...props} />;
};

export const RegisteredTextareaField = (
  props: FinalRegisteredBaseFieldProps<"textarea">
) => {
  return <RegisteredBaseField fieldType="textarea" {...props} />;
};

/* 
Variation for base field just like registered base fields
TODO Maybe I will change my mind about them

export type FinalBaseFieldProps<T extends BaseFieldType> = Omit<
  BaseFieldProps<T>,
  'fieldType'
>;

export const InputField = (props: FinalBaseFieldProps<'input'>) => {
  return <BaseField fieldType="input" {...props} />;
};

export const SelectField = (props: FinalBaseFieldProps<'select'>) => {
  return <BaseField fieldType="select" {...props} />;
};

export const TextareaField = (props: FinalBaseFieldProps<'textarea'>) => {
  return <BaseField fieldType="textarea" {...props} />;
};
*/

/*
Example usage

<InputField
className='mt-5 w-96'
label='First name'
leadingAddon={<span className='text-gray-500 sm:text-sm'>$</span>}
inputClassName=''
leadingAddonClassName='px-3'
leadingAddonDetached
inputType='select'
error='This is an error message, you people'
inputProps={{ placeholder: 'First name' }}
extraText='Optional'
helperText='Brief description for your profile. URLs are hyperlinked.'
trailingAddon={
  <>
    <label htmlFor='currency' className='sr-only'>
      Currency
    </label>
    <select
      id='currency'
      name='currency'
      className='h-full py-0 pl-2 text-gray-500 bg-transparent border-transparent rounded-md focus:ring-indigo-500 focus:border-indigo-500 pr-7 sm:text-sm'
    >
      <option>USD</option>
      <option>CAD</option>
      <option>EUR</option>
    </select>
  </>
}
trailingAddonEventsEnabled
trailingAddonDetached
>
<option>United States</option>
<option>Canada</option>
<option>Mexico</option>
</InputField> */
