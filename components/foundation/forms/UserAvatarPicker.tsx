import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { Controller } from "react-hook-form";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

import { Button } from "../buttons";
import { TypicalDialog } from "../dialogs/structural";
import { UserAvatar, AVATARS_MAP, DEFAULT_AVATAR } from "../avatars";
import {
  CustomPartial,
  RegisteredControlledFieldProps,
} from "../../../lib/types";

export interface UserAvatarPickerProps {
  value: string;
  onChange: (avatar: string) => void;
  className?: string;
}

export const UserAvatarPicker = ({
  value,
  onChange,
  className,
}: UserAvatarPickerProps) => {
  const [internalValue, setInternalValue] = useState(value);

  const { t } = useTranslation();

  return (
    <div className={classNames(className, "flex items-center gap-3")}>
      <UserAvatar size="7xl" avatar={value} />

      <TypicalDialog<string>
        render={(ds) => (
          <Button
            size="xs"
            color="white"
            onClick={() => {
              ds.toggle();
            }}
          >
            {t("common:change")}
          </Button>
        )}
        resultDataHandler={{
          resultData: internalValue,
          setResultData: setInternalValue,
        }}
        onToggle={(ds) => {
          if (!ds.isOpen) setInternalValue(value);
        }}
        headerProps={{
          title: t("common:avatar-picker-title"),
        }}
        footerProps={{
          positiveButton: {
            text: t("common:choose"),
            listener: (ds) => {
              onChange(internalValue);
              ds.toggle();
            },
          },
          negativeButton: { text: t("common:cancel") },
        }}
      >
        {(ds) => (
          <RadioGroup
            value={ds.resultDataHandler!.resultData}
            onChange={ds.resultDataHandler!.setResultData}
            className="flex gap-5 px-4 py-6"
          >
            {Object.keys(AVATARS_MAP).map((avatar) => (
              <RadioGroup.Option
                key={avatar}
                value={avatar}
                className="relative cursor-pointer focus:outline-none"
              >
                {({ active, checked }) => (
                  <>
                    {checked && (
                      <span className="absolute top-0 right-0 z-50 mt-0.5 mr-0.5 transform translate-x-1/2 -translate-y-1/2 bg-white border border-primary-300 rounded-full">
                        <CheckIcon className="w-4 h-4 text-primary-300 " />
                      </span>
                    )}
                    <UserAvatar
                      className={classNames({
                        "ring-2 ring-primary": checked,
                        "ring ring-primary-600": active,
                      })}
                      avatar={avatar}
                      roundedFull={false}
                      size="6xl"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        )}
      </TypicalDialog>
    </div>
  );
};

export type RegisteredUserAvatarPickerProps = Omit<
  UserAvatarPickerProps,
  "value" | "onChange"
> &
  CustomPartial<RegisteredControlledFieldProps, "defaultValue">;

export const RegisteredUserAvatarPicker = ({
  name,
  defaultValue = DEFAULT_AVATAR,
  control,
  ...userAvatarPickerProps
}: RegisteredUserAvatarPickerProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => {
        return (
          <UserAvatarPicker
            {...userAvatarPickerProps}
            value={field.value}
            onChange={field.onChange}
          />
        );
      }}
    />
  );
};
