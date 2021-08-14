import classNames from "classnames";

import { Icon, IconProps } from "../Icon";

export type IconButtonColor = "primary" | "white" | "black" | "gray";

export interface IconButtonProps {
  iconProps: IconProps;
  innerProps?: React.ComponentPropsWithRef<"button">;
  /** This will take precedence over innerProps onClick */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  className?: string;
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
}

export const IconButton = ({
  iconProps,

  innerProps,
  onClick,

  className,
  rounded = false,
  color = "gray",
  dense = false,
  hoverType = "fill",
}: IconButtonProps) => {
  return (
    <button
      type="button"
      {...innerProps}
      onClick={onClick}
      className={classNames(
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
          "text-gray-500": color === "gray",

          // Dense
          "bg-gray-200 p-1.5": dense,

          // Hover type
          "hover:text-gray-700": hoverType === "simple",
          "hover:text-white": hoverType === "simpleWhite",

          "hover:bg-gray-300": hoverType === "fill" && dense,
          [`relative isolate before:absolute before:-inset-1.5 before:z-[-10] hover:before:bg-gray-200 ${
            rounded ? "before:rounded" : "before:rounded-full"
          }`]: hoverType === "fill" && !dense,
        }
      )}
    >
      <Icon {...iconProps} />
    </button>
  );
};
