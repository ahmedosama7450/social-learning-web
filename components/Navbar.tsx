import {
  BellIcon,
  LightningBoltIcon,
  SupportIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";

import { Icon, IconButton, Logo, SearchBar } from ".";
import { DetailedUserAvatar } from "./DetailedUserAvatar";

export interface NavbarProps {
  title: string;
  className?: string;
}

export const Navbar = ({ title, className }: NavbarProps) => {
  return (
    <div className={classNames(className, "flex items-center")}>
      <div className="w-56">
        <Logo />
      </div>

      <div className="ml-2.5 text-xl font-semibold text-gray-600">{title}</div>

      <SearchBar className="ml-auto mr-5" />

      <IconButton
        iconProps={{
          hIcon: LightningBoltIcon,
          size: "md",
        }}
        color="darkGray"
        dense
      />

      <IconButton
        iconProps={{
          hIcon: BellIcon,
          size: "md",
        }}
        className="mx-5"
        color="darkGray"
        dense
      />

      <IconButton
        iconProps={{ hIcon: SupportIcon, size: "md" }}
        className="mr-5"
        color="darkGray"
        dense
      />

      <button className="relative flex items-center gap-3.5 before:rounded before:absolute before:-inset-1 hover:before:shadow-sm hover:before:ring-1 hover:before:ring-gray-200">
        <DetailedUserAvatar />
        <Icon
          className="flex-shrink-0 text-gray-500"
          hIcon={ChevronDownIcon}
          size="md"
        />
      </button>
    </div>
  );
};
