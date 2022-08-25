import classNames from "classnames";
import { useTranslation } from "next-i18next";

import { ActiveLink, PropsWithClassName } from "overwind-ui";

export const HomeTabs = ({ className }: PropsWithClassName<{}>) => {
  const { t } = useTranslation("home");

  return (
    <ul className={classNames(className, "flex items-start gap-2.5")}>
      {homeTabs.map(({ titleKey, href }, i) => (
        <li key={i}>
          <ActiveLink
            href={href}
            className={(active) =>
              classNames(
                "block px-2 pb-1.5 text-md",
                active
                  ? "border-b-4 border-primary font-medium text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              )
            }
          >
            {t(`main-tabs.${titleKey}`).toString()}
          </ActiveLink>
        </li>
      ))}
    </ul>
  );
};

const homeTabs: { titleKey: string; href: string }[] = [
  {
    titleKey: "newsfeed",
    href: "/",
  },
  {
    titleKey: "discussions",
    href: "discussions",
  },
  {
    titleKey: "questions",
    href: "questions",
  },
  {
    titleKey: "articles",
    href: "articles",
  },
];
