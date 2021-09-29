import { Menu } from "@headlessui/react";
import classNames from "classnames";
import React, { ElementType, ComponentPropsWithoutRef } from "react";
import { CheckIcon } from "@heroicons/react/solid";

import { BaseDropdown, BaseDropdownProps } from "./BaseDropdown";
import { Icon, BaseIconProps } from "../Icon";
import { BaseButton, BaseButtonProps, ButtonType } from "../..";

export type RegularDropdownItem<T extends ButtonType> = BaseButtonProps<T> & {
  text: string;

  icon?: BaseIconProps;
  description?: string;

  disabled?: boolean;
  divider?: boolean;
  selected?: boolean;
};

export type RegularDropdownProps<T extends ElementType> = Omit<
  BaseDropdownProps,
  "children" | "items"
> & {
  /* Items should never change as we use index as react keys*/
  items: RegularDropdownItem<ButtonType>[];
  /* Dropdown button */
  as: T;
  asProps?: ComponentPropsWithoutRef<T>;
};

export const RegularDropdown = <T extends ElementType>({
  items,
  as,
  asProps,
  ...baseProps
}: RegularDropdownProps<T>) => {
  return (
    <BaseDropdown
      {...baseProps}
      items={
        <div className="px-1 py-1">
          {items.map(
            (
              {
                text,

                icon,
                description,

                disabled,
                divider,
                selected,

                ...baseButtonProps
              },
              index
            ) => {
              return (
                <Menu.Item key={index} disabled={disabled}>
                  {({ active, disabled }) => (
                    <BaseButton
                      {...baseButtonProps}
                      className={classNames("block w-full text-left", {
                        "border-b pb-1 mb-1 border-gray-100":
                          divider && index !== items.length - 1, // The last item can't have a divider
                      })}
                    >
                      <div
                        className={classNames(
                          "px-2 py-2.5 rounded-md flex gap-2.5 hover:bg-gray-100",
                          // active not working for some reason, we're using hover, instead for now
                          {
                            "bg-gray-100": active,
                          }
                        )}
                      >
                        {icon && (
                          <Icon
                            {...icon}
                            size="md"
                            className="self-start flex-shrink-0 text-gray-500"
                          />
                        )}
                        <div>
                          <div
                            className={classNames("text-sm text-gray-700", {
                              "font-semibold": description,
                              "font-medium": !description,
                              "text-opacity-70 cursor-not-allowed": disabled,
                            })}
                          >
                            {text}
                          </div>
                          {description && (
                            <div className="text-xs text-gray-500">
                              {description}
                            </div>
                          )}
                        </div>
                        <CheckIcon
                          className={classNames(
                            "self-center flex-shrink-0 ml-auto w-5 h-5 text-gray-500",
                            {
                              invisible: !selected,
                            }
                          )}
                          aria-hidden="true"
                        />
                      </div>
                    </BaseButton>
                  )}
                </Menu.Item>
              );
            }
          )}
        </div>
      }
    >
      <Menu.Button
        as={as}
        {...(asProps as any)} /*TODO When asProps is undefined, I get a typescript error, not sure why ? */
      />
    </BaseDropdown>
  );
};
