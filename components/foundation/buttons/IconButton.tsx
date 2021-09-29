import classNames from "classnames";
import { forwardRef } from "react";

import { Icon, IconProps } from "../Icon";
import {
  BaseButton,
  BaseButtonProps,
  BaseButtonRef,
  ButtonType,
  ButtonTypeDefault,
} from "./BaseButton";

export type IconButtonColor =
  | "primary"
  | "white"
  | "black"
  | "gray"
  | "darkGray"
  | "lightGray";

// TODO Rename iconProps to icon

export type IconButtonProps<T extends ButtonType = typeof ButtonTypeDefault> =
  BaseButtonProps<T> & {
    iconProps: IconProps;

    rounded?: boolean;
    color?: IconButtonColor;
    /** Adds background color */
    dense?: boolean;
    /**
     * fill hover changes bg color
     * simple hover changes text color
     * simpleWhite hover changes text color to white
     */
    hoverType?: "fill" | "simple" | "simpleWhite";
  };

const WrappedIconButton = <T extends ButtonType = typeof ButtonTypeDefault>(
  {
    iconProps,
    rounded = false,
    color = "gray",
    dense = false,
    hoverType = "fill",

    className,
    ...restBaseButtonProps
  }: IconButtonProps<T>,
  ref: BaseButtonRef<T>
) => {
  return (
    <BaseButton
      {...restBaseButtonProps}
      ref={ref}
      className={classNames(
        className,
        "block",

        // Rounded
        rounded ? "rounded" : "rounded-full",

        {
          // Color
          "text-primary": color === "primary",
          "text-white": color === "white",
          "text-gray-800": color === "black",
          "text-gray-300": color === "lightGray",
          "text-gray-400": color === "gray",
          "text-gray-500": color === "darkGray",

          // Dense
          "bg-blueGray-100 p-1.5": dense,

          // Hover type
          [color === "darkGray"
            ? "hover:text-gray-600"
            : "hover:text-gray-500"]: hoverType === "simple",
          "hover:text-white": hoverType === "simpleWhite",

          "hover:bg-blueGray-200": hoverType === "fill" && dense,
          [`pseudo-bg hover:before:bg-blueGray-100 ${
            rounded ? "before:rounded" : "before:rounded-full"
          }`]: hoverType === "fill" && !dense,
        }
      )}
    >
      <Icon {...iconProps} />
    </BaseButton>
  );
};

export const IconButton = forwardRef(WrappedIconButton);
