import classNames from "classnames";
import { XIcon, PlusIcon } from "@heroicons/react/solid";

import { IconButton } from ".";
import { TagType } from "../lib/backendTypes";

export type TagActionType = "add" | "remove";

export interface TagAction {
  type: TagActionType;
  listener: () => void;
}

export const Tag = ({
  text,
  type,
  action,

  className,
}: {
  text: string;
  type: TagType;
  action?: TagAction;

  className?: string;
}) => {
  return (
    <div
      className={classNames(
        className,
        "px-1.5 py-0.5 text-xs rounded-md flex items-center justify-center",

        // Color
        {
          "border border-gray-600 text-gray-600": type === TagType.SUBJECT,
          "border border-red-600 text-red-600": type === TagType.DEPARTMENT,
          "border border-yellow-600 text-yellow-600": type === TagType.TERM,
        }
      )}
    >
      <span>{text}</span>

      {action && (
        <IconButton
          className="ml-1"
          color="darkGray"
          hoverType="simple"
          iconProps={{
            hIcon: action.type === "add" ? PlusIcon : XIcon,
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
