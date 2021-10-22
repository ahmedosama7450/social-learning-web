import classNames from "classnames";

import {
  BaseButton,
  Icon,
  IconButton,
  Logo,
  SearchBar,
  DetailedUserAvatar,
} from ".";
import { UserFragment } from "../__generated__/graphql";

export interface NavbarProps {
  title: string;
  user: UserFragment;
  className?: string;
}

export const Navbar = ({ title, user, className }: NavbarProps) => {
  return (
    <div className={classNames(className, "flex items-center justify-between")}>
      <div className="flex items-center">
        {/*TODO Put w-56 in a css variable */}
        <div className="hidden w-56 lg:block">
          <Logo className="w-max" />
        </div>
        <Logo collapseIntoIcon className="block lg:hidden" />

        <div className="ml-4 text-xl font-semibold text-gray-500">{title}</div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
        <SearchBar className="hidden sm:block sm:w-60 md:w-80 lg:w-96" />
        <SearchBar collapseIntoIcon className="block sm:hidden" />

        {/*TODO Will be turned into a reputation dropdown */}
        <IconButton
          type="button"
          iconProps={{
            icon: "heroicons-solid:lightning-bolt",
            size: "md",
          }}
          color="darkGray"
          dense
        />

        {/*TODO Will be turned into a notifications dropdown */}
        <IconButton
          type="button"
          iconProps={{
            icon: "heroicons-solid:bell",
            size: "md",
          }}
          color="darkGray"
          dense
        />

        {/*TODO Will be turned into a profile dropdown */}
        <BaseButton
          type="button"
          className="flex items-center gap-3 rounded-sm pseudo-bg-sm before:rounded-sm hover:before:ring-1 hover:before:ring-gray"
        >
          <DetailedUserAvatar hideDetailsOnMobile user={user} />

          <Icon
            className="flex-shrink-0 hidden text-gray-500 sm:block"
            icon="ri:arrow-down-s-line"
            size="md"
          />
        </BaseButton>
      </div>
    </div>
  );
};
