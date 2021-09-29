import classNames from "classnames";

export const Divider = ({
  vertical,
  light = false,
  className,
}: {
  vertical?: boolean;
  light?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={classNames(className, light ? "bg-gray-100" : "bg-gray-200", {
        "w-full h-px ": !vertical,
        "w-px h-full": vertical,
      })}
    />
  );
};
