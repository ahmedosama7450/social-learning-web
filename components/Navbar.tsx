import classNames from "classnames";
import {
  BaseButton,
  Icon,
  IconButton,
  SlideOver,
  PropsWithClassName,
} from "overwind-ui";

import { Logo, SearchBar, DetailedUserAvatar, Sidebar } from ".";
import { UserFragment } from "../__generated__/graphql";

export interface NavbarProps {
  title: string;
  user: UserFragment;
}

export const Navbar = ({
  title,
  user,
  className,
}: PropsWithClassName<NavbarProps>) => {
  return (
    <div className={classNames(className, "flex items-center justify-between")}>
      <div className="flex items-center">
        {/* Logo when screen size > xl 
            Width is set so that It aligns with the complete sidebar
        */}
        <div className="hidden xl:block xl:w-[var(--sidebar-width)]">
          <Logo className="max-w-max" />
        </div>

        {/* Logo when screen size < xl
            - On xs, a width is set and the logo is aligned horizontally in the center,
            so that It aligns with the collapsed sidebar

            - Before xs, nothing needs to be done because there the sidebar is hidden
        */}
        <div className="xs:flex xs:w-[var(--collapsed-sidebar-width)] xs:justify-center xl:hidden">
          <SlideOver
            header={() => <Logo />}
            headerDivider
            innerCloseButton
            content={() => (
              <Sidebar responsive={false} className="mt-1.5 mb-1" />
            )}
          >
            {(ds) => (
              <Logo
                className="max-w-max"
                collapseIntoIcon
                onClick={() => ds.toggle()}
              />
            )}
          </SlideOver>
        </div>

        {/* When sidebar shows starting from xs, the title is aligned with layout content */}
        <div className="ml-2.5 text-xl font-semibold text-gray-600 xs:ml-[var(--sidebar-margin-right)]">
          {title}
        </div>
      </div>

      {/* On md, the search bar shows, so we decrease the gap to give it more space */}
      <div className="flex items-center gap-3 xs:gap-4 md:gap-3 lg:gap-5">
        <SearchBar />

        {/*TODO Will be turned into a reputation dropdown */}
        <IconButton
          type="button"
          iconProps={{
            icon: "heroicons-solid:lightning-bolt",
            size: "md",
          }}
          color="darkGray"
          bgColor="secondary"
        />

        {/*TODO Will be turned into a notifications dropdown */}
        <IconButton
          type="button"
          iconProps={{
            icon: "heroicons-solid:bell",
            size: "md",
          }}
          color="darkGray"
          bgColor="secondary"
        />

        {/*TODO Will be turned into a profile dropdown */}
        <BaseButton
          type="button"
          className="pseudo-bg-sm flex items-center gap-3 rounded-sm before:rounded-sm hover:before:ring-1 hover:before:ring-gray"
        >
          <DetailedUserAvatar hideDetailsBelowXs user={user} />

          <Icon
            className="hidden shrink-0 text-gray-500 sm:block"
            icon="ri:arrow-down-s-line"
            size="md"
          />
        </BaseButton>
      </div>
    </div>
  );
};
