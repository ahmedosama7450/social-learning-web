import classNames from "classnames";

import { UserFragment } from "../__generated__/graphql";

export interface UserReputationProps {
  className?: string;
  reputation: UserFragment["reputation"];
}

export const UserReputation = ({
  className,
  reputation,
}: UserReputationProps) => {
  return (
    <div className={classNames(className, "flex items-center gap-1")}>
      <div className="shrink-0 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
      <div className="text-xs font-semibold text-gray-400 truncate">
        {reputation}
      </div>
    </div>
  );
};
