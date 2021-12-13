import classNames from "classnames";

import { UserAvatar, UserReputation } from "../..";
import { UserFragment } from "../../../__generated__/graphql";

export type DetailedUserAvatarProps = {
  user: Pick<UserFragment, "firstName" | "lastName" | "avatar" | "reputation">;
  className?: string;
  /** Hide details when screen size is less than xs breakpoint */
  hideDetailsBelowXs?: boolean;
};

export const DetailedUserAvatar = ({
  user,
  className,
  hideDetailsBelowXs: hideDetailsBelowXs = false,
}: DetailedUserAvatarProps) => {
  return (
    <div className={classNames(className, "flex items-center gap-1.5")}>
      <UserAvatar
        avatar={user.avatar}
        size="xl"
        className="flex-shrink-0"
        roundedFull={false}
      />

      <div
        className={classNames("flex-grow w-20 text-left", {
          "hidden xs:block": hideDetailsBelowXs,
        })}
      >
        <div className="text-xs font-semibold text-gray-800 truncate">
          {user.firstName + " " + user.lastName}
        </div>

        <UserReputation reputation={user.reputation} />
      </div>
    </div>
  );
};
