import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Controller } from "react-hook-form";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

import {
  Button,
  TypicalDialog,
  UserAvatar,
  USER_AVATARS_MAP,
  DEFAULT_USER_AVATAR,
  Icon,
} from "../..";
import {
  SelectivePartial,
  RegisteredControlledFieldProps,
  PropsWithClassName,
  StateProps,
} from "../../../lib/types";

export type UserAvatarPickerProps = PropsWithClassName<StateProps<string>>;

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
        content={(ds) => (
          <RadioGroup
            value={ds.resultDataHandler!.resultData}
            onChange={ds.resultDataHandler!.setResultData}
            className="flex gap-5 px-4 py-6"
          >
            {Object.keys(USER_AVATARS_MAP).map((avatar) => (
              <RadioGroup.Option
                key={avatar}
                value={avatar}
                className="relative cursor-pointer focus:outline-none"
              >
                {({ active, checked }) => (
                  <>
                    {checked && (
                      <span className="absolute top-0 right-0 z-50 mt-0.5 mr-0.5 translate-x-1/2 -translate-y-1/2 bg-white border border-primary-300 rounded-full">
                        <Icon
                          icon="ri:check-line"
                          size="sm"
                          className="text-primary-300"
                        />
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
      >
        {(ds) => (
          <Button
            type="button"
            size="xs"
            color="white"
            flat
            onClick={() => {
              ds.toggle();
            }}
          >
            {t("common:change")}
          </Button>
        )}
      </TypicalDialog>
    </div>
  );
};

export type RegisteredUserAvatarPickerProps = Omit<
  UserAvatarPickerProps,
  "value" | "onChange"
> &
  SelectivePartial<RegisteredControlledFieldProps, "defaultValue">;

export const RegisteredUserAvatarPicker = ({
  name,
  defaultValue = DEFAULT_USER_AVATAR,
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
