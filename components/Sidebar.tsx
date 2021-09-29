import {
  BookmarkIcon,
  ChartSquareBarIcon,
  HomeIcon,
  SearchIcon,
  SpeakerphoneIcon,
  UserIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import {
  BookmarkIcon as SolidBookmarkIcon,
  ChartSquareBarIcon as SolidChartSquareBarIcon,
  HomeIcon as SolidHomeIcon,
  SearchIcon as SolidSearchIcon,
  SpeakerphoneIcon as SolidSpeakerphoneIcon,
  UserIcon as SolidUserIcon,
  ViewGridIcon as SolidViewGridIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import Link from "next/link";
import { Fragment } from "react";

import { ActiveLink, Avatar, BaseIconProps, Button, Divider, Icon } from ".";

export const Sidebar = ({ className }: { className?: string }) => {
  return (
    <nav className={classNames(className, "flex flex-col items-stretch pr-4")}>
      {/* Main items */}

      <ul className={classNames("flex flex-col gap-1.5 items-stretch")}>
        {sidebarItems.map((item, i) => {
          return (
            <Fragment key={i}>
              {item === "---" ? (
                <Divider className="my-1" light />
              ) : (
                <li>
                  <ActiveLink href={item.href}>
                    {(active) => (
                      <a
                        className={classNames(
                          "flex items-center gap-3 group py-2.5 rounded pl-1",
                          {
                            "bg-blueGray-100": active,
                          }
                        )}
                      >
                        <Icon
                          {...(active ? item.solidIcon : item.outlinedIcon)}
                          size="md"
                          className={classNames(
                            active
                              ? "text-gray-600"
                              : "group-hover:text-gray-700 text-gray-500"
                          )}
                        />
                        <span
                          className={classNames(
                            "text-sm",
                            active
                              ? "font-semibold text-gray-900"
                              : "group-hover:text-gray-900 font-medium text-gray-600"
                          )}
                        >
                          {item.title}
                        </span>
                      </a>
                    )}
                  </ActiveLink>
                </li>
              )}
            </Fragment>
          );
        })}
      </ul>

      {/* Shortcut spaces */}
      <div className="mt-1.5 group">
        {/* Title */}
        <div className="flex items-center justify-between text-xs text-gray-900">
          <span>Frequently visited spaces</span>
          <Button size="xs" className="hidden group-hover:inline" color="link">
            Edit
          </Button>
        </div>

        {/* Spaces list */}
        {fakeSpacesData.map((item, index) => (
          <Link href="#" key={index}>
            <a className="flex items-center gap-2 mt-3.5 font-medium text-gray-600 hover:text-gray-900">
              <Avatar
                avatarUrl={item.avatarUrl}
                size="lg"
                roundedFull
                className="flex-shrink-0"
              />
              <span className="text-xs">{item.name}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

const fakeSpacesData: { name: string; avatarUrl: string }[] = [
  {
    name: "Prep 1 Engineering discussions",
    avatarUrl: "/temp-placeholders/placeholder-1.png",
  },
  {
    name: "Chemistry for all",
    avatarUrl: "/temp-placeholders/placeholder-1.png",
  },
];

const sidebarItems: (
  | {
      title: string;
      href: string;
      solidIcon: BaseIconProps;
      outlinedIcon: BaseIconProps;
    }
  | "---"
)[] = [
  {
    title: "Home",
    href: "/",
    solidIcon: { hIcon: SolidHomeIcon },
    outlinedIcon: { hIcon: HomeIcon },
  },
  {
    title: "Explore",
    href: "explore",
    solidIcon: { hIcon: SolidSearchIcon },
    outlinedIcon: { hIcon: SearchIcon },
  },
  "---",
  {
    title: "Spaces",
    href: "spaces",
    solidIcon: { hIcon: SolidViewGridIcon },
    outlinedIcon: { hIcon: ViewGridIcon },
  },
  {
    title: "Rooms",
    href: "rooms",
    solidIcon: { hIcon: SolidSpeakerphoneIcon },
    outlinedIcon: { hIcon: SpeakerphoneIcon },
  },
  {
    title: "Tournaments",
    href: "tournaments",
    solidIcon: { hIcon: SolidChartSquareBarIcon },
    outlinedIcon: { hIcon: ChartSquareBarIcon },
  },
  "---",
  {
    title: "Bookmarks",
    href: "bookmarks",
    solidIcon: { hIcon: SolidBookmarkIcon },
    outlinedIcon: { hIcon: BookmarkIcon },
  },
  {
    title: "Profile",
    href: "profile",
    solidIcon: { hIcon: SolidUserIcon },
    outlinedIcon: { hIcon: UserIcon },
  },
  "---",
];

/*
Avatar card, doesn't look good
<div className="flex items-center justify-center my-2">
        <div className="relative flex flex-col items-center gap-1 px-3 py-3 border border-gray-100 rounded-sm bg-gray-50">
          <div className="absolute inset-x-0 bottom-0 bg-white rounded h-3/5"></div>
          <UserAvatar roundedFull={false} size="7xl" avatar="1" />
          <span className="z-50 text-base">ahmed osama</span>

          <div className="z-50 flex items-center gap-1">
            <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full" />
            <div className="text-xs text-gray-500 truncate">500 reputation</div>
          </div>
        </div>
      </div> */
