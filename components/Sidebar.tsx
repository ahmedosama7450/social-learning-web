import classNames from "classnames";
import { useTranslation } from "next-i18next";

import { ActiveLink, Icon, IconIdentifier } from ".";
import { PropsWithClassName } from "../lib/types";
import { SidebarSpaces } from "./SidebarSpaces";

// TODO Maybe hover effects need to stand out more, Idk. It looks simple and neat as it is, though

export const Sidebar = ({
  /**
   * Responsive sidebar is hidden below xs, then gets collapsed up until xl, when it gets complete
   *
   * Unresponsive sidebar is a complete sidebar, always
   *
   */
  responsive = true,
  className,
}: PropsWithClassName<{ responsive?: boolean }>) => {
  const { t } = useTranslation();

  return (
    <nav
      className={classNames(
        className,
        responsive
          ? "hidden xs:flex xs:flex-col xs:w-[var(--collapsed-sidebar-width)] xl:w-[var(--sidebar-width)] xl:pr-4"
          : "flex flex-col"
      )}
    >
      <ul
        className={classNames("flex flex-col gap-1.5", {
          "items-center xl:items-stretch": responsive,
        })}
      >
        {sidebarItems.map(
          ({ titleKey, href, solidIcon, outlinedIcon, divider }, i) => {
            return (
              <li
                key={i}
                className={classNames("flex-shrink-0", {
                  // Last item in collapsed sidebar shouldn't divider
                  [i !== sidebarItems.length - 1 || !responsive
                    ? "border-b border-gray-100 pb-2.5 mb-1"
                    : "xl:border-b xl:border-gray-100 xl:pb-2.5 xl:mb-1"]: divider,
                })}
              >
                <ActiveLink
                  href={href}
                  className={(active) =>
                    classNames(
                      "flex items-center gap-3 group",

                      responsive
                        ? "rounded-full p-2 xl:rounded xl:py-2.5 xl:pl-1"
                        : "rounded py-2.5 pl-1",

                      {
                        "bg-secondary": active,
                      }
                    )
                  }
                >
                  {(active) => (
                    <>
                      <Icon
                        icon={active ? solidIcon : outlinedIcon}
                        size="md"
                        className={classNames(
                          "flex-shrink-0",
                          active
                            ? "text-gray-600"
                            : "text-gray-500 group-hover:text-gray-700"
                        )}
                      />

                      <div
                        className={classNames(
                          "text-sm tracking-wide",
                          active
                            ? "font-semibold text-gray-900"
                            : "font-medium text-gray-600 group-hover:text-gray-900",
                          {
                            "hidden xl:block": responsive,
                          }
                        )}
                      >
                        {t("common:sidebar.items." + titleKey)}
                      </div>
                    </>
                  )}
                </ActiveLink>
              </li>
            );
          }
        )}
      </ul>

      <SidebarSpaces
        className={classNames("mt-2", {
          "hidden xl:block": responsive,
        })}
      />
    </nav>
  );
};

const sidebarItems: {
  titleKey: string;
  href: string;
  solidIcon: IconIdentifier;
  outlinedIcon: IconIdentifier;
  divider?: true;
}[] = [
  {
    titleKey: "home",
    href: "/",
    solidIcon: "ri:home-7-fill",
    outlinedIcon: "ri:home-7-line",
  },
  {
    titleKey: "explore",
    href: "explore",
    solidIcon: "ri:search-fill",
    outlinedIcon: "ri:search-line",
    divider: true,
  },
  {
    titleKey: "spaces",
    href: "spaces",
    solidIcon: "ri:apps-fill",
    outlinedIcon: "ri:apps-line",
  },
  {
    titleKey: "rooms",
    href: "rooms",
    solidIcon: "ri:movie-2-fill",
    outlinedIcon: "ri:movie-line",
  },
  {
    titleKey: "tournaments",
    href: "tournaments",
    solidIcon: "ri:trophy-fill",
    outlinedIcon: "ri:trophy-line",
    divider: true,
  },
  {
    titleKey: "bookmarks",
    href: "bookmarks",
    solidIcon: "ri:bookmark-fill",
    outlinedIcon: "ri:bookmark-line",
  },
  {
    titleKey: "profile",
    href: "profile",
    solidIcon: "ri:user-3-fill",
    outlinedIcon: "ri:user-3-line",
    divider: true,
  },
];
