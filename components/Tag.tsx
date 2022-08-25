import classNames from "classnames";
import { IconButton, PropsWithClassName } from "overwind-ui";

import { TagType } from "../lib/backendTypes";

export type TagActionType = "add" | "remove";

export interface TagAction {
  type: TagActionType;
  listener: () => void;
}

export interface TagProps {
  text: string;
  type: TagType;
  action?: TagAction;
}

export const Tag = ({
  text,
  type,
  action,

  className,
}: PropsWithClassName<TagProps>) => {
  return (
    <div
      className={classNames(
        className,
        "flex items-center justify-center rounded-md px-1.5 py-0.5",

        // Color
        {
          "border border-gray-600 text-gray-600": type === TagType.SUBJECT,
          "border border-red-600 text-red-600": type === TagType.DEPARTMENT,
          "border border-yellow-600 text-yellow-600": type === TagType.TERM,
        }
      )}
    >
      <span className="text-xs">{text}</span>

      {action && (
        <IconButton
          type="button"
          className="ml-1"
          color="darkGray"
          hoverType="simple"
          iconProps={{
            icon: action.type === "add" ? "ri:add-line" : "ri:close-line",
            size: "xs",
          }}
          onClick={() => {
            action.listener();
          }}
        />
      )}
    </div>
  );
};
