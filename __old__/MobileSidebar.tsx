import {
  BadgeCheckIcon,
  BookmarkIcon,
  ChartSquareBarIcon,
  CogIcon,
  LogoutIcon,
  SpeakerphoneIcon,
  TicketIcon,
} from "@heroicons/react/outline";

import { BaseIconProps, Divider, NextLink } from "../components";

export const MobileSidebar = () => {
  return (
    <div className="py-6">
      <ul>
        {mobileSidebarItems.map((item) =>
          item === "---" ? (
            <Divider className="mb-6" />
          ) : (
            <li key={item.title}>
              <NextLink
                href={item.href}
                color="transparent"
                className="mb-6"
                selected={item.title === "Bookmarks"}
                iconProps={{ ...item.icon }}
              >
                {item.title}
              </NextLink>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

const mobileSidebarItems: (
  | {
      href: string;
      title: string;
      icon: BaseIconProps;
    }
  | "---"
)[] = [
  {
    title: "Rooms",
    href: "/rooms",
    icon: { hIcon: SpeakerphoneIcon },
  },
  {
    title: "Tournaments",
    href: "/tournaments",
    icon: { hIcon: ChartSquareBarIcon },
  },
  { title: "Bookmarks", href: "/bookmarks", icon: { hIcon: BookmarkIcon } },

  "---",

  { title: "Settings", href: "/settings", icon: { hIcon: CogIcon } },
  { title: "Report Bugs", href: "/report-bugs", icon: { hIcon: TicketIcon } },
  {
    title: "Request verification badge",
    href: "verify",
    icon: { hIcon: BadgeCheckIcon },
  },
  { title: "Logout", href: "/logout", icon: { hIcon: LogoutIcon } },
];
