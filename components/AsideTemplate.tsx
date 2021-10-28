import { IconButton, IconButtonProps } from ".";
import { PropsWithRequiredChildren } from "../lib/types";

export type AsideTemplateProps = PropsWithRequiredChildren<{
  title: string;
  helperButtons?: (Omit<IconButtonProps<"button">["iconProps"], "size"> &
    Required<Pick<IconButtonProps<"button">, "onClick">>)[];
}>;

export const AsideTemplate = ({
  title,
  helperButtons,
  children,
}: AsideTemplateProps) => {
  return (
    <div className="pb-5 rounded-lg bg-secondary">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <h3 className="text-lg font-bold tracking-wide text-gray-600">
          {title}
        </h3>

        {helperButtons && (
          <div className="flex items-center">
            {helperButtons.map(({ onClick, ...iconProps }, i) => {
              return (
                <IconButton
                  key={i}
                  iconProps={{ size: "md", ...iconProps }}
                  onClick={onClick}
                  type="button"
                  color="darkGray"
                  hoverType="simple"
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-3">{children}</div>
    </div>
  );
};
