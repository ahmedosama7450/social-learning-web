import { BaseButtonProps } from "./Button";

export type CustomButtonProps = {
  children?: JSX.Element;
} & BaseButtonProps<"button">;

export const CustomButton = ({
  children,

  innerProps,
  onClick,
  className,
}: CustomButtonProps) => {
  return (
    <button
      type="button"
      {...innerProps}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};
