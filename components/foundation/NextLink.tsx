import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

export type NextLinkProps = LinkProps &
  Omit<React.ComponentPropsWithoutRef<"a">, "href">;

export const NextLink = forwardRef<HTMLAnchorElement, NextLinkProps>(
  (
    {
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
      ...aProps
    },
    ref
  ) => {
    return (
      <Link
        href={href}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
        prefetch={prefetch}
        locale={locale}
      >
        <a {...aProps} ref={ref} />
      </Link>
    );
  }
);

// @ts-ignore
NextLink.displayName = "NextLink";
