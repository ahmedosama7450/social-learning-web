import classNames from "classnames";
import { IconProp as FaIconProps } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Size } from "../../lib/types";

/**
 * customIcon can be anything but mostly an svg element
 */
export type BaseIconProps =
  | {
      hIcon: React.ComponentType<React.ComponentProps<"svg">>;
    }
  | {
      faIcon: FaIconProps;
    }
  | { customIcon: JSX.Element };

export type IconProps = BaseIconProps & {
  className?: string;
  size?: Size;
};

export const Icon = (props: IconProps) => {
  const { size = "md", className } = props;

  if ("hIcon" in props) {
    // Hero icon
    return (
      <props.hIcon
        className={classNames(
          className,
          // Size
          {
            "w-4 h-4": size === "xs",
            "h-5 w-5": size === "sm",
            "h-6 w-6": size === "md",
            "h-7 w-7": size === "lg",
            "h-8 w-8": size === "xl",
          }
        )}
      />
    );
  } else if ("faIcon" in props) {
    // FontAwesome icon
    return (
      // TODO There are size inconsistancies between hIcon and faIcon
      // TODO Font awesome has a lot of properties which you might want to use, maybe
      <FontAwesomeIcon
        icon={props.faIcon}
        className={classNames(className, {
          // Size
          "text-[1rem]": size === "xs",
          "text-[1.25rem]": size === "sm",
          "text-[1.5rem]": size === "md",
          "text-[1.75rem]": size === "lg",
          "text-[2rem]": size === "xl",
        })}
      />
    );
  } else {
    // Custom Icon
    return (
      <span
        className={classNames(
          className,
          "inline-block",

          // Size
          {
            "h-4 w-4": size === "xs",
            "h-5 w-5": size === "sm",
            "h-6 w-6": size === "md",
            "h-7 w-7": size === "lg",
            "h-8 w-8": size === "xl",
          }
        )}
      >
        {props.customIcon}
      </span>
    );
  }
};
