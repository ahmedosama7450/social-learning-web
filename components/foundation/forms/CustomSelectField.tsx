import classNames from "classnames";
import { Fragment, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import {
  CustomPartial,
  RegisteredControlledFieldProps,
} from "../../../lib/types";

export type OptionValue = string | number | null;

export interface CustomSelectFieldOption {
  value: OptionValue;
  text: string;
  imageSrc?: string;
}

interface CustomSelectFieldProps {
  options: CustomSelectFieldOption[]; // Options must have distinct values as they are used for react keys
  /** Must be withing options */
  value: OptionValue;
  onChange: (value: OptionValue) => void;

  label?: string;
  helperText?: string;
  error?: string;

  className?: string;
  flat?: boolean;
  roundedFull?: boolean;
}

export const CustomSelectField = ({
  options,
  value,
  onChange,

  label,
  helperText,
  error,

  className,
  flat = true,
  roundedFull = false,
}: CustomSelectFieldProps) => {
  /* This way of managing state is better, so we don't have to do additional searches
   Also, It aligns with the example given in headless ui repo */

  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => {
      return option.value === value;
    })! // The value given must be within the options
  );

  useEffect(() => {
    // Keep value and selectedOption in sync
    setSelectedOption(
      options.find((option) => {
        return option.value === value;
      })! // The value given must be within the options
    );
  }, [options, value]);

  return (
    <Listbox
      as="div"
      className={className}
      value={selectedOption}
      onChange={(option) => {
        setSelectedOption(option);
        onChange(option.value);
      }}
    >
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="form-label">{label}</Listbox.Label>
          )}

          <div className="relative mt-1">
            <Listbox.Button
              className={classNames(
                error ? "form-error" : "form-normal",
                roundedFull ? "form-rounded-full" : "form-rounded",
                { "shadow-sm": !flat },
                "relative w-full bg-white border pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 sm:text-sm"
              )}
            >
              <span className="flex items-center">
                {selectedOption.imageSrc && (
                  <span className="relative flex-shrink-0 w-5 h-5 bg-gray-200 rounded-full">
                    <Image
                      src={selectedOption.imageSrc}
                      alt="Select Icon"
                      layout="fill"
                    />
                  </span>
                )}
                <span
                  className={classNames(
                    selectedOption.imageSrc ? "ml-3" : "ml-1",
                    "block truncate"
                  )}
                >
                  {selectedOption.text}
                </span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-primary-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9 h-11 flex items-center"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        {option.imageSrc && (
                          <span className="relative flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full">
                            <Image
                              src={option.imageSrc}
                              alt="Select Icon"
                              layout="fill"
                            />
                          </span>
                        )}
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            selectedOption.imageSrc ? "ml-3" : "ml-1",
                            "block truncate"
                          )}
                        >
                          {option.text}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-primary-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>

          {error ? (
            <p className="mt-1.5 text-sm text-error">{error}</p>
          ) : (
            helperText && (
              <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
            )
          )}
        </>
      )}
    </Listbox>
  );
};

type RegisteredCustomSelectFieldProps = CustomPartial<
  Omit<CustomSelectFieldProps, "error" | "value">,
  "onChange"
> &
  RegisteredControlledFieldProps;

export const RegisteredCustomSelectField = ({
  name,
  defaultValue,
  control,

  onChange,
  ...rest
}: RegisteredCustomSelectFieldProps) => {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field, fieldState }) => {
        const errorKey = fieldState.error?.message;

        return (
          <CustomSelectField
            {...rest}
            error={errorKey ? t(errorKey) : undefined}
            value={field.value}
            onChange={(optionValue) => {
              field.onChange(optionValue); // TODO I am not sure if I really need to pass in anything
              if (onChange) onChange(optionValue);
            }}
          />
        );
      }}
    />
  );
};
