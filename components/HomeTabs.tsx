import classNames from "classnames";

import { ActiveLink } from ".";

export const HomeTabs = ({ className }: { className?: string }) => {
  return (
    <ul className={classNames(className, "flex items-start gap-2")}>
      {homeTabs.map(({ title, href }) => (
        <li key={title}>
          <ActiveLink href={href}>
            {(active) => (
              <a
                className={classNames("block px-2 pb-1.5 text-sm", {
                  "border-b-4 border-primary text-gray-900 font-medium": active,
                  "text-gray-500 hover:text-gray-900": !active,
                })}
              >
                {title}
              </a>
            )}
          </ActiveLink>
        </li>
      ))}
    </ul>
  );
};

const homeTabs: { title: string; href: string }[] = [
  {
    title: "Newsfeed",
    href: "/",
  },
  {
    title: "Discussions",
    href: "discussions",
  },
  {
    title: "Questions",
    href: "questions",
  },
  {
    title: "Articles",
    href: "articles",
  },
];
