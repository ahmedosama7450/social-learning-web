import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { ComponentPropsWithoutRef } from "react";

import { FieldBodyProps, FieldBody } from "./FieldBody";
import { RegisteredUnControlledFieldProps } from "../../../../lib/types";

export type BaseFieldType = "input" | "textarea" | "select";

export type BaseFieldProps<T extends BaseFieldType> = FieldBodyProps & {
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
};

export const BaseField = <T extends BaseFieldType>({
  fieldType,
  innerProps,
  ...fieldBodyProps
}: BaseFieldProps<T>) => {
  return (
    <FieldBody<ComponentPropsWithoutRef<"label">>
      render={(className) => {
        const El =
          fieldType === "input"
            ? "input"
            : fieldType === "textarea"
            ? "textarea"
            : "select";

        return (
          <El
            type={fieldType === "input" ? "text" : undefined} // This is necessary to make tailwind forms plugin work. Can be overridden in inputFieldProps
            {...(innerProps as any)} // I am not sure why the it complains about the typing, but It's definitely correct
            className={classNames(className, innerProps?.className)}
          />
        );
      }}
      showErrorIcon={fieldType === "input"}
      labelAs="label"
      labelAsProps={{ htmlFor: innerProps?.id }}
      {...fieldBodyProps}
    />
  );
};

type FinalBaseFieldProps<T extends BaseFieldType> = Omit<
  BaseFieldProps<T>,
  "fieldType"
>;

export type InputFieldProps = FinalBaseFieldProps<"input">;

export const InputField = (props: InputFieldProps) => {
  return <BaseField fieldType="input" {...props} />;
};

export type SelectFieldProps = FinalBaseFieldProps<"select">;

export const SelectField = (props: SelectFieldProps) => {
  return <BaseField fieldType="select" {...props} />;
};

export type TextareaFieldProps = FinalBaseFieldProps<"textarea">;

export const TextareaField = (props: TextareaFieldProps) => {
  return <BaseField fieldType="textarea" {...props} />;
};

//----------------------------------------------------------------------------------

export type RegisteredBaseFieldProps<T extends BaseFieldType> =
  RegisteredUnControlledFieldProps & Omit<BaseFieldProps<T>, "errorMsg">;

export const RegisteredBaseField = <T extends BaseFieldType>({
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

        onChange: (e: any) => {
          fieldRegister.onChange(e);
          if (innerProps?.onChange) innerProps.onChange(e);
        },
        onBlur: (e: any) => {
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

export type RegisteredInputFieldProps = FinalRegisteredBaseFieldProps<"input">;

export const RegisteredInputField = (props: RegisteredInputFieldProps) => {
  return <RegisteredBaseField fieldType="input" {...props} />;
};

export type RegisteredSelectFieldProps =
  FinalRegisteredBaseFieldProps<"select">;

export const RegisteredSelectField = (props: RegisteredSelectFieldProps) => {
  return <RegisteredBaseField fieldType="select" {...props} />;
};

export type RegisteredTextareaFieldProps =
  FinalRegisteredBaseFieldProps<"textarea">;

export const RegisteredTextareaField = (
  props: RegisteredTextareaFieldProps
) => {
  return <RegisteredBaseField fieldType="textarea" {...props} />;
};

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
