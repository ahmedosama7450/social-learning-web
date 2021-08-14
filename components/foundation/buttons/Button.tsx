import classNames from "classnames";
import BaseLink, { LinkProps as BaseLinkProps } from "next/link";
import { forwardRef } from "react";

import { Icon, BaseIconProps } from "../Icon";
import { Size } from "../../../lib/types";

/**
 * TODO This structure works and all but It's got some repetition to it. Here are some alternatives:
 * 1. Using react composition model and generic component (That's what I am thing about doing)
 * 2. Conditionally render component depending on props instead oh having two separate components
 */

export type ButtonSize = Size | "full";

export type ButtonColor =
  | "primary"
  | "secondary"
  | "white"
  | "white-primary"
  | "red"
  | "transparent"; // TODO Maybe add transparent-primary, transparent-black, transparent-red

type GeneralButtonProps<T extends "button" | "a"> = {
  children: string;
  innerProps?: React.ComponentPropsWithoutRef<T>;
  /** This will take precedence over innerProps onClick */
  onClick?: React.MouseEventHandler<
    T extends "button" ? HTMLButtonElement : HTMLAnchorElement
  >;

  className?: string;
  size?: ButtonSize;
  color?: ButtonColor;
  roundedFull?: boolean;

  iconProps?: ButtonIconProps;
  uppercaseText?: boolean;
};

export type ButtonProps = GeneralButtonProps<"button">;

export const Button = ({
  children,
  innerProps,
  onClick,

  className,
  size = "md",
  color = "primary",
  roundedFull = false,

  iconProps,
  uppercaseText = false,
}: ButtonProps) => {
  return (
    <button
      type="button"
      {...innerProps}
      onClick={onClick}
      className={makeButtonClassName({ className, size, color, roundedFull })}
    >
      <ButtonChildren
        iconProps={iconProps}
        uppercaseText={uppercaseText}
        color={color}
        size={size}
      >
        {children}
      </ButtonChildren>
    </button>
  );
};

export type LinkProps = GeneralButtonProps<"a"> & {
  /** This will take precedence over innerProps href */
  href?: string;
};

// TODO name isn't great ?
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      children,

      innerProps,
      onClick,

      className,
      size = "md",
      color = "primary",
      roundedFull = false,

      iconProps,
      uppercaseText = false,
    },
    ref
  ) => {
    return (
      <a
        {...innerProps}
        ref={ref}
        href={href}
        onClick={onClick}
        className={makeButtonClassName({ className, size, color, roundedFull })}
      >
        <ButtonChildren
          iconProps={iconProps}
          uppercaseText={uppercaseText}
          color={color}
          size={size}
        >
          {children}
        </ButtonChildren>
      </a>
    );
  }
);
Link.displayName = "Link";

export type NextLinkProps = {
  linkProps: Omit<LinkProps, "href">;
} & BaseLinkProps;

// TODO name isn't great ?
export const NextLink = ({ linkProps, ...baseLinkProps }: NextLinkProps) => {
  return (
    <BaseLink {...baseLinkProps} passHref>
      <Link {...linkProps} />
    </BaseLink>
  );
};

//-----------------------------------------------------------------------------------

type ReallyGeneralButtonProps = GeneralButtonProps<"button">;

function makeButtonClassName({
  className,
  size,
  color,
  roundedFull,
}: Pick<
  ReallyGeneralButtonProps,
  "className" | "size" | "color" | "roundedFull"
>) {
  return classNames(
    className,
    "inline-flex items-center justify-center shadow-sm font-medium disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600",

    // Size
    {
      "text-sm px-3 py-2 leading-4": size === "xs",
      "text-sm px-4 py-2": size === "sm",
      "text-base px-5 py-3": size === "md",
      "text-lg px-5 py-3": size === "lg",
      "text-xl px-6 py-4": size === "xl",
      "text-lg px-6 py-3 w-full": size === "full",
    },

    // Rounded
    roundedFull ? "rounded-full" : "rounded-md",

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
      "text-primary bg-white hover:bg-primary-50": color === "white-primary",
      "text-white bg-red-600 hover:bg-red-700": color === "red",
      "text-gray-500 hover:text-gray-900 !shadow-none !p-0":
        color === "transparent", // TODO Maybe don't use !important
    }
  );
}

const ButtonChildren = ({
  children,
  size,
  color,
  iconProps,
  uppercaseText,
}: Pick<
  ReallyGeneralButtonProps,
  "children" | "iconProps" | "size" | "color" | "uppercaseText"
>) => {
  return (
    <>
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
    </>
  );
};

type ButtonIconProps = BaseIconProps & {
  isTrailing?: boolean;
  className?: string;
};

const ButtonIcon = ({
  size,
  color,

  isTrailing = false,
  className,
  ...baseIconProps
}: Pick<ReallyGeneralButtonProps, "size" | "color"> & ButtonIconProps) => {
  return (
    <Icon
      size={
        size === "full" ? "sm" : size === "xl" || size === "lg" ? "md" : size
      }
      className={classNames(
        className,

        isTrailing ? "ml-2" : "mr-2",

        // Color
        {
          "text-white": color === "primary" || color === "red",
          "text-primary": color === "secondary",
          "text-gray-500":
            color === "white" ||
            color === "white-primary" ||
            color === "transparent",
        }
      )}
      {...baseIconProps}
    />
  );
};
