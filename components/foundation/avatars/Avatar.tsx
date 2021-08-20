import classNames from "classnames";
import Image from "next/image";

import { ExtraFullSize } from "../../../lib/types";

export interface AvatarProps {
  avatarUrl: string;

  className?: string;
  size?: ExtraFullSize;
  roundedFull?: boolean;
  borderless?: boolean;
  flat?: boolean;
}

export const Avatar = ({
  avatarUrl,

  className,
  size = "5xl",
  roundedFull = true,
  borderless = true,
  flat = true,
}: AvatarProps) => {
  return (
    <div
      className={classNames(
        className,
        "bg-gray-100 overflow-hidden relative",
        // Size
        {
          "h-4 w-4": size === "xs",
          "h-5 w-5": size === "sm",
          "h-6 w-6": size === "md",
          "h-7 w-7": size === "lg",
          "h-8 w-8": size === "xl",
          "h-9 w-9": size === "2xl",
          "h-10 w-10": size === "3xl",
          "h-11 w-11": size === "4xl",
          "h-12 w-12": size === "5xl",

          "h-14 w-14": size === "6xl",
          "h-16 w-16": size === "7xl",
          "h-20 w-20": size === "8xl",
          "h-24 w-24": size === "9xl",
          "h-28 w-28": size === "10xl",
        },

        // Rounded
        roundedFull ? "rounded-full" : "rounded",

        {
          // Border
          "border border-gray-200": !borderless,

          // Shadow
          "shadow-sm": !flat,
        }
      )}
    >
      <Image src={avatarUrl} alt="Avatar" layout="fill" objectFit="cover" />
    </div>
  );
};
