import classNames from "classnames";
import { useTranslation } from "next-i18next";

import { IconIdentifier, Icon, BaseButton } from ".";
import { PropsWithClassName } from "../lib/types";

export const HomePostingLinks = ({ className }: PropsWithClassName<{}>) => {
  const { t } = useTranslation("home");

  return (
    <div
      className={classNames(
        className,
        "flex items-center justify-between gap-4"
      )}
    >
      {homePostingLinks.map(({ icon, i18nKey, href }, i) => (
        <BaseButton
          key={i}
          type="next-link"
          href={href}
          className="flex flex-col items-center justify-center flex-1 h-32 px-1.5 text-center border border-gray-200 rounded sm:px-3 bg-secondary hover:bg-gray-100"
        >
          <Icon size="lg" icon={icon} className="text-gray-500" />

          <div className="mt-1.5 text-sm sm:text-base font-semibold text-gray-800">
            {t(`posting-links.${i18nKey}.title`)}
          </div>

          <div className="text-xs mt-0.5 text-gray-500 sm:text-gray-600">
            {t(`posting-links.${i18nKey}.desc`)}
          </div>
        </BaseButton>
      ))}
    </div>
  );
};

const homePostingLinks: {
  icon: IconIdentifier;
  i18nKey: string;
  href: string;
}[] = [
  {
    icon: "heroicons-outline:pencil-alt",
    i18nKey: "discussion",
    href: "create/discussion",
  },
  {
    icon: "heroicons-outline:light-bulb",
    i18nKey: "question",
    href: "create/question",
  },
  {
    icon: "heroicons-outline:book-open",
    i18nKey: "article",
    href: "create/article",
  },
];
