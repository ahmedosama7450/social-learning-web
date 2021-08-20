import classNames from "classnames";
import { forwardRef } from "react";
import BaseLink, { LinkProps as BaseLinkProps } from "next/link";

import { Icon, IconProps } from "../Icon";
import { BaseButtonProps } from "./Button";

export type IconButtonColor =
  | "primary"
  | "white"
  | "black"
  | "gray"
  | "darkGray"
  | "lightGray";

export type IconButtonProps<T extends "button" | "a"> = {
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
} & BaseButtonProps<T>;

export const IconButton = ({
  iconProps,

  innerProps,
  onClick,

  className,
  rounded = false,
  color = "gray",
  dense = false,
  hoverType = "fill",
}: IconButtonProps<"button">) => {
  return (
    <button
      type="button"
      {...innerProps}
      onClick={onClick}
      className={makeIconButtonClassName({
        className,
        rounded,
        color,
        dense,
        hoverType,
      })}
    >
      <Icon {...iconProps} />
    </button>
  );
};

export type IconLinkProps = IconButtonProps<"a"> & {
  href?: string;
};

// TODO Name isn't great ?
export const IconLink = forwardRef<HTMLAnchorElement, IconLinkProps>(
  (
    {
      href,

      iconProps,

      innerProps,
      onClick,

      className,
      rounded = false,
      color = "gray",
      dense = false,
      hoverType = "fill",
    },
    ref
  ) => {
    return (
      <a
        {...innerProps}
        ref={ref}
        href={href}
        onClick={onClick}
        className={makeIconButtonClassName({
          className,
          rounded,
          color,
          dense,
          hoverType,
        })}
      >
        <Icon {...iconProps} />
      </a>
    );
  }
);
IconLink.displayName = "IconLink";

export type NextIconLinkProps = Omit<IconLinkProps, "href"> & BaseLinkProps;

// TODO Name isn't great ?
// TODO Extra props passed
export const NextIconLink = ({ href, ...rest }: NextIconLinkProps) => {
  return (
    <BaseLink {...rest} href={href} passHref>
      <IconLink {...rest} />
    </BaseLink>
  );
};

//-----------------------------------------------------------------------------------

function makeIconButtonClassName({
  className,
  rounded,
  color,
  dense,
  hoverType,
}: Pick<
  IconButtonProps<"button">,
  "className" | "rounded" | "color" | "dense" | "hoverType"
>) {
  return classNames(
    className,
    // TODO focus isn't really looking great and is behind hover background
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500",

    // Rounded
    rounded ? "rounded" : "rounded-full",

    {
      // Color
      "text-primary": color === "primary",
      "text-white": color === "white",
      "text-gray-900": color === "black",
      "text-gray-300": color === "lightGray",
      "text-gray-400": color === "gray",
      "text-gray-500": color === "darkGray",

      // Dense
      "bg-gray-200 p-1.5": dense,

      // Hover type
      [color === "darkGray" ? "hover:text-gray-600" : "hover:text-gray-500"]:
        hoverType === "simple",
      "hover:text-white": hoverType === "simpleWhite",

      "hover:bg-gray-300": hoverType === "fill" && dense,
      [`relative isolate before:absolute before:-inset-1.5 before:z-[-10] hover:before:bg-gray-200 ${
        rounded ? "before:rounded" : "before:rounded-full"
      }`]: hoverType === "fill" && !dense,
    }
  );
}
