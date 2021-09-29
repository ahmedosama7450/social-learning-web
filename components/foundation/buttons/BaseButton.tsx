import { LinkProps } from "next/link";
import { forwardRef, ForwardedRef } from "react";

import { NextLink, NextLinkProps } from "../NextLink";
import { ClickListener } from "../../../lib/types";
import classNames from "classnames";

export type ButtonType = "button" | "a" | "next-link";

export const ButtonTypeDefault = "button";

export type BaseButtonProps<T extends ButtonType = typeof ButtonTypeDefault> = {
  type?: T;

  innerProps?: T extends "next-link"
    ? NextLinkProps
    : // @ts-ignore
      React.ComponentPropsWithoutRef<T>;
  onClick?: ClickListener<
    T extends "button" ? HTMLButtonElement : HTMLAnchorElement
  >;
  className?: string;
} & (T extends "button"
  ? {}
  : {
      href: T extends "next-link"
        ? LinkProps["href"]
        : T extends "a"
        ? string
        : undefined;
    });

export type BaseButtonRef<T extends ButtonType> = ForwardedRef<
  T extends "button" ? HTMLButtonElement : HTMLAnchorElement
>;

const WrappedBaseButton = <T extends ButtonType>(
  {
    children,

    type,

    innerProps,
    onClick,
    className,

    // @ts-ignore
    href,
  }: React.PropsWithChildren<BaseButtonProps<T>>,
  ref: BaseButtonRef<T>
) => {
  const El =
    type === "next-link"
      ? NextLink
      : type === "a"
      ? "a"
      : type === "button"
      ? "button"
      : ButtonTypeDefault;

  return (
    <El
      // @ts-ignore
      type={type === "button" ? "button" : undefined}
      {...innerProps}
      // @ts-ignore
      onClick={onClick}
      href={href}
      // @ts-ignore
      ref={ref}
      // TODO focus isn't really looking great and is behind hover background in IconButton
      className={classNames(
        className,
        "disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 focus-visible:ring-offset-white"
      )}
    >
      {children}
    </El>
  );
};

export const BaseButton = forwardRef(WrappedBaseButton);
