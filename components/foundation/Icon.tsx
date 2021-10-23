import classNames from "classnames";
import { Icon as IconifyIcon, IconifyIconProps } from "@iconify/react";

import { Size } from "../../lib/types";

export type IconIdentifier = IconifyIconProps["icon"];

export type IconProps = Omit<
  IconifyIconProps,
  "width" | "height" | "color" | "onLoad"
> & {
  className?: string;
  size?: Size;
};

export const Icon = ({ size = "lg", ...rest }: IconProps) => {
  return (
    <IconifyIcon
      {...rest}
      height={classNames({
        "0.875rem": size === "xs",
        "1rem": size === "sm",
        "1.25rem": size === "md",
        "1.5rem": size === "lg",
        "1.75rem": size === "xl",
      })}
    />
  );
};

/*
<props.hIcon
  className={classNames(
    className,
    // Size
    {
      "w-3.5 h-3.5": size === "xs",
      "h-4 w-4": size === "sm",
      "h-5 w-5": size === "md",
      "h-6 w-6": size === "lg",
      "h-7 w-7": size === "xl",
    }
  )}
/>
*/
