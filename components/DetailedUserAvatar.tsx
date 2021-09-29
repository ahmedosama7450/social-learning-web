import classNames from "classnames";
import { ExtraFullSize } from "../lib/types";

import { UserAvatar } from ".";

export const DetailedUserAvatar = ({ className }: { className?: string }) => {
  return (
    <div className={classNames(className, "flex items-center gap-1.5")}>
      <UserAvatar size="xl" className="flex-shrink-0" roundedFull={false} />
      <div className="max-w-s[100px] flex-grow min-w-0 text-left">
        <div className="text-xs font-medium text-gray-800 truncate">
          ahmed osama
        </div>
        <UserReputation />
      </div>
    </div>
  );
};

export const UserReputation = () => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full" />
      <div className="text-xs font-medium text-gray-500 truncate">500</div>
    </div>
  );
};
