import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Button, BaseButton, Avatar } from ".";
import { PropsWithClassName } from "../lib/types";

/*
  TODO This component is more of a placeholder for now and no functionality is implemented yet!
  
  Generally speaking, there are two modes:
    - Frequently visited spaces (Default): which doesn't require the user to setup any thing.
      We will be recording which spaces are mostly visited and display them here

    - Favorite spaces: which requires the user to setup a list of favorite spaces (3 at max)
      the data will be kept on the database within the user profile

  Also, Consider empty states for both modes
*/

export const SidebarSpaces = ({ className }: PropsWithClassName<{}>) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(className, "group")}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-900">Frequently visited spaces</span>

        <Button
          type="button"
          size="xs"
          className="hidden group-hover:flex"
          color="transparent-link"
        >
          {t("common:edit")}
        </Button>
      </div>

      {fakeSpacesData.map(({ name, avatarUrl, href }, index) => (
        <BaseButton
          key={index}
          type="next-link"
          href={href}
          className="flex items-center gap-2 mt-3.5"
        >
          <Avatar
            avatarUrl={avatarUrl}
            size="lg"
            roundedFull
            className="shrink-0"
          />
          <span className="text-xs font-medium text-gray-600 hover:text-gray-900">
            {name}
          </span>
        </BaseButton>
      ))}
    </div>
  );
};

const fakeSpacesData: { name: string; avatarUrl: string; href: string }[] = [
  {
    name: "Prep 1 Engineering discussions",
    avatarUrl: "/temp-placeholders/placeholder-1.png",
    href: "#",
  },
  {
    name: "Chemistry for all",
    avatarUrl: "/temp-placeholders/placeholder-1.png",
    href: "#",
  },
];
