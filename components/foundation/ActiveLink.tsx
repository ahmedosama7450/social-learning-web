import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const ActiveLink = ({
  children,
  ...props
}: LinkProps & {
  children: (active: boolean) => React.ReactNode;
}) => {
  const { asPath, pathname } = useRouter();

  return (
    <Link {...props}>
      {children(pathname === props.href || pathname === props.as)}
    </Link>
  );
};
