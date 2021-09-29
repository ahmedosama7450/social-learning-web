import classNames from "classnames";
import { ButtonClickLister } from "../lib/types";
import { BaseButton, BaseButtonProps, BaseIconProps, Icon } from ".";

// TODO Stroke + fill when voted might look better than filled icon
export const VotingButton = ({
  voted,
  icon,
  filledIcon,
  color,

  className,
  ...restBaseButtonProps
}: {
  voted: boolean;
  icon: BaseIconProps;
  filledIcon: BaseIconProps;

  color: "primary" | "red";
} & BaseButtonProps<"button">) => {
  return (
    <BaseButton
      {...restBaseButtonProps}
      className={classNames(
        className,
        "pseudo-bg before:rounded-full",
        {
          "hover:before:bg-primary-100 hover:text-primary": color === "primary",
          "hover:before:bg-red-100 hover:text-red-500": color === "red",
        },
        !voted
          ? "text-gray-500"
          : {
              "text-primary": color === "primary",
              "text-red-500": color === "red",
            }
      )}
    >
      <Icon {...(voted ? filledIcon : icon)} size="xs" />
    </BaseButton>
  );
};
