import classNames from "classnames";
import { forwardRef, ForwardedRef } from "react";

import {
  BaseButton,
  BaseButtonProps,
  ButtonType,
  ButtonTypeDefault,
} from "./BaseButton";
import { Icon, BaseIconProps } from "../Icon";
import { Size } from "../../../lib/types";
import { BaseButtonRef } from ".";

export type ButtonSize = Size | "full";

export type ButtonColor =
  | "primary"
  | "secondary"
  | "white"
  | "white-primary"
  | "red"
  | "gray"
  | "darkGray"
  | "link"; // TODO Maybe add transparent-primary, transparent-black, transparent-red

export type ButtonProps<T extends ButtonType = typeof ButtonTypeDefault> =
  BaseButtonProps<T> & {
    children: string;

    size?: ButtonSize;
    color?: ButtonColor;
    roundedFull?: boolean;
    underlineOnHover?: boolean;

    iconProps?: ButtonIconProps;
    uppercaseText?: boolean;
  };

const WrappedButton = <T extends ButtonType = typeof ButtonTypeDefault>(
  {
    children,

    size = "md",
    color = "primary",
    roundedFull = false,
    underlineOnHover = false,

    iconProps,
    uppercaseText = false,

    className,
    ...restBaseButtonProps
  }: ButtonProps<T>,
  ref: BaseButtonRef<T>
) => {
  return (
    <BaseButton
      {...restBaseButtonProps}
      ref={ref}
      className={classNames(
        className,
        "flex items-center justify-center group font-medium",

        // Size
        {
          "text-xs px-3 py-2 leading-4": size === "xs",
          "text-sm px-4 py-2": size === "sm",
          "text-base px-5 py-2.5": size === "md",
          "text-lg px-5 py-2.5": size === "lg",
          "text-xl px-6 py-3": size === "xl",
          "text-base px-6 py-3 w-full": size === "full", // TODO remove size full
        },

        // Rounded
        roundedFull ? "rounded-full" : "rounded",

        // TODO Customize focus-visible for every color
        // TODO Add disabled variants for all colors just like primary
        // TODO Review these colors again (We need to support idle, hover, focus-visible, disabled states)
        // Color
        {
          "bg-primary text-white hover:bg-primary-600 disabled:bg-primary-400 disabled:hover:bg-primary-300":
            color === "primary",
          "text-primary border border-primary hover:bg-primary-200 disabled:text-primary-400 disabled:hover:text-primary-300":
            color === "secondary",
          "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50":
            color === "white",
          "text-primary bg-white hover:bg-primary-50":
            color === "white-primary",
          "text-white bg-red-600 hover:bg-red-700": color === "red",
          "!shadow-none !p-0 text-gray-500 hover:text-gray-900":
            color === "gray", // TODO Maybe don't use !important
          "!shadow-none !p-0 text-gray-600 hover:text-gray-900":
            color === "darkGray", // TODO Maybe don't use !important
          "!shadow-none !p-0 text-link hover:text-linkHover": color === "link", // TODO Maybe don't use !important

          "hover:underline": underlineOnHover,
        }
      )}
    >
      {iconProps && !iconProps.isTrailing && (
        <ButtonIcon size={size} color={color} {...iconProps} />
      )}

      <span
        className={classNames({
          "uppercase tracking-wide": uppercaseText,
        })}
      >
        {children}
      </span>

      {iconProps && iconProps.isTrailing && (
        <ButtonIcon size={size} color={color} {...iconProps} />
      )}
    </BaseButton>
  );
};

export const Button = forwardRef(WrappedButton);

type ButtonIconProps = BaseIconProps & {
  isTrailing?: boolean;
  className?: string;
};

// TODO Add hover effect to icons, especially needed with transparent colors
const ButtonIcon = ({
  size,
  color,

  isTrailing = false,
  className,
  ...baseIconProps
}: Pick<ButtonProps<"button">, "size" | "color"> & ButtonIconProps) => {
  return (
    <Icon
      size={size === "full" ? "md" : size === "xl" ? "lg" : size}
      className={classNames(
        className,

        isTrailing ? "ml-2" : "mr-2",

        // Color
        {
          "text-white": color === "primary" || color === "red",
          "text-primary": color === "secondary",
          "text-gray-500 group-hover:text-gray-600":
            color === "white" ||
            color === "white-primary" ||
            color === "gray" ||
            color === "darkGray",
        }
      )}
      {...baseIconProps}
    />
  );
};
