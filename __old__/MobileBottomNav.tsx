import {
  BellIcon,
  HomeIcon,
  SearchIcon,
  UserIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import {
  BellIcon as SolidBellIcon,
  HomeIcon as SolidHomeIcon,
  SearchIcon as SolidSearchIcon,
  UserIcon as SolidUserIcon,
  ViewGridIcon as SolidViewGridIcon,
} from "@heroicons/react/solid";

import { BaseIconProps, NextIconLink } from "../../web/components";

export const MobileBottomNav = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 bg-white border-t sm:hidden">
      <ul className="flex items-center justify-between px-8 py-3">
        {mobileNavItems.map((item) => (
          <li key={item.href}>
            <NextIconLink
              href={item.href}
              iconProps={{
                ...(item.href === "/home" ? item.solidIcon : item.outlinedIcon),
                size: "lg",
              }}
              color={item.href === "/home" ? "primary" : "gray"}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

const mobileNavItems: {
  href: string;
  solidIcon: BaseIconProps;
  outlinedIcon: BaseIconProps;
}[] = [
  {
    href: "/home",
    solidIcon: { hIcon: SolidHomeIcon },
    outlinedIcon: { hIcon: HomeIcon },
  },
  {
    href: "/explore",
    solidIcon: { hIcon: SolidSearchIcon },
    outlinedIcon: { hIcon: SearchIcon },
  },
  {
    href: "/notifications",
    solidIcon: { hIcon: SolidBellIcon },
    outlinedIcon: { hIcon: BellIcon },
  },
  {
    href: "/spaces",
    solidIcon: { hIcon: SolidViewGridIcon },
    outlinedIcon: { hIcon: ViewGridIcon },
  },
  {
    href: "/profile",
    solidIcon: { hIcon: SolidUserIcon },
    outlinedIcon: { hIcon: UserIcon },
  },
];
