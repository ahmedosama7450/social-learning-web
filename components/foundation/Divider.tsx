import classNames from "classnames";

export const Divider = ({
  vertical,
  className,
}: {
  vertical?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={classNames(className, "bg-divider", {
        "w-full h-px ": !vertical,
        "w-px h-full": vertical,
      })}
    />
  );
};
