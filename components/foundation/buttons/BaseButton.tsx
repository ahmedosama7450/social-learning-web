import classNames from "classnames";
import { LinkProps } from "next/link";
import { forwardRef, ForwardedRef, ComponentPropsWithoutRef } from "react";

import { NextLink, NextLinkProps } from "../NextLink";
import { ClickListener, PropsWithRequiredChildren } from "../../../lib/types";

export type ButtonType = "button" | "a" | "next-link";

export type BaseButtonProps<T extends ButtonType> = {
  type: T;

  /**
   * href and onClick are omitted, and provided by the component props for convenience
   */
  innerProps?: T extends "next-link"
    ? Omit<NextLinkProps, "href" | "onClick">
    : T extends "a"
    ? Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick">
    : Omit<ComponentPropsWithoutRef<"button">, "onClick">;

  /**
   * Shortcut extracted for convenience
   */
  onClick?: ClickListener<
    T extends "button" ? HTMLButtonElement : HTMLAnchorElement
  >;

  className?: string;
} & (T extends "button"
  ? {}
  : {
      /**
       * Shortcut extracted for convenience, only available for `a` and `next-link` types
       */
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
  }: PropsWithRequiredChildren<BaseButtonProps<T>>,
  ref: BaseButtonRef<T>
) => {
  const El = type === "next-link" ? NextLink : type === "a" ? "a" : "button";

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
