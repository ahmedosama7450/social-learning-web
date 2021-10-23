import classNames from "classnames";
import { forwardRef } from "react";

import { Size } from "../../../lib/types";
import { Icon, IconProps } from "../Icon";
import {
  BaseButton,
  BaseButtonProps,
  BaseButtonRef,
  ButtonType,
} from "./BaseButton";

export type ButtonColor =
  | "primary"
  | "primary-bordered"
  | "primary-white"
  | "secondary"
  | "white"
  | "red"
  | "transparent-primary"
  | "transparent-gray"
  | "transparent-darkGray"
  | "transparent-extraDarkGray"
  | "transparent-red"
  | "transparent-link";

export type ButtonProps<T extends ButtonType> = BaseButtonProps<T> & {
  children: string;
  iconProps?: ButtonIconProps;
  isIconTrailing?: boolean;

  size?: Size;
  flat?: boolean;
  color?: ButtonColor;
  roundedFull?: boolean;
  underlineOnHover?: boolean;
  uppercaseText?: boolean;
};

const WrappedButton = <T extends ButtonType>(
  {
    children,
    iconProps,
    isIconTrailing = false,

    size = "md",
    flat = false,
    color = "primary",
    roundedFull = false,
    underlineOnHover = false,
    uppercaseText = false,

    className,
    ...restBaseButtonProps
  }: ButtonProps<T>,
  ref: BaseButtonRef<T>
) => {
  return (
    // @ts-ignore
    <BaseButton
      {...restBaseButtonProps}
      ref={ref}
      className={classNames(
        className,
        // TODO Experiment with inline icon instead of using flex (I want to see how it will look, flex still works fine)
        "flex items-center justify-center group gap-2",

        {
          // Size
          "text-xs px-3 py-2": size === "xs",
          "text-sm px-4 py-2": size === "sm",
          "text-base px-5 py-2.5": size === "md",
          "text-lg px-5 py-3": size === "lg",
          "text-xl px-6 py-3": size === "xl",

          // Flat
          "shadow-sm": !flat,

          // TODO Add disabled variants for all colors just like primary and primary-bordered
          // Color
          // color handles text, background, border colors including idle, hover, disabled, focus-visible(handled by BaseButton) states
          "text-white bg-primary hover:bg-primary-600 disabled:bg-primary-400 disabled:hover:bg-primary-300":
            color === "primary",

          "text-primary border border-primary hover:bg-primary-100 disabled:text-primary-400 disabled:hover:text-primary-300":
            color === "primary-bordered",

          "text-primary bg-white hover:bg-primary-50":
            color === "primary-white",

          "text-gray-700 bg-secondary hover:bg-secondary-dark":
            color === "secondary",

          "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50":
            color === "white",

          "text-white bg-red-600 hover:bg-red-700": color === "red",

          "shadow-none px-0 py-0 text-primary hover:text-primary-600":
            color === "transparent-primary",

          "shadow-none px-0 py-0 text-gray-500 hover:text-gray-700":
            color === "transparent-gray",

          "shadow-none px-0 py-0 text-gray-600 hover:text-gray-800":
            color === "transparent-darkGray",

          "shadow-none px-0 py-0 text-gray-700 hover:text-gray-900":
            color === "transparent-extraDarkGray",

          "shadow-none px-0 py-0 text-red-600 hover:text-red-700":
            color === "transparent-red",

          "shadow-none px-0 py-0 text-link hover:text-linkHover":
            color === "transparent-link",
        },

        // Rounded
        roundedFull ? "rounded-full" : "rounded-md"
      )}
    >
      {iconProps && !isIconTrailing && (
        <ButtonIcon size={size} color={color} {...iconProps} />
      )}

      <span
        className={classNames("font-medium", {
          "uppercase tracking-wide": uppercaseText,
          "hover:underline": underlineOnHover,
        })}
      >
        {children}
      </span>

      {iconProps && isIconTrailing && (
        <ButtonIcon size={size} color={color} {...iconProps} />
      )}
    </BaseButton>
  );
};

export const Button = forwardRef(WrappedButton);

type ButtonIconProps = Omit<IconProps, "className" | "size" | "inline">;

const ButtonIcon = ({
  size,
  color,

  ...iconProps
}: Pick<ButtonProps<"button">, "size" | "color"> & ButtonIconProps) => {
  return (
    <Icon
      {...iconProps}
      size={size === "xl" ? "lg" : size}
      className={classNames({
        // Color
        "text-white": color === "primary" || color === "red",

        "text-primary group-hover:text-primary-600":
          color === "primary-bordered" ||
          color === "primary-white" ||
          color === "transparent-primary",

        "text-gray-500 group-hover:text-gray-600":
          color === "white" ||
          color === "secondary" ||
          color === "transparent-gray" ||
          color === "transparent-darkGray" ||
          color === "transparent-extraDarkGray",

        "text-red-500 group-hover:text-red-600": color === "transparent-red",

        "text-link group-hover:text-linkHover": color === "transparent-link",
      })}
    />
  );
};

// Padding
/* [`${
            size === "xs" ? "px-3 py-2" : size === "sm" ? "px-4 py-2" : "dds"
          }`]:
            color === "primary" ||
            color === "primary-bordered" ||
            color === "primary-white" ||
            color === "secondary" ||
            color === "white" ||
            color === "red", */
