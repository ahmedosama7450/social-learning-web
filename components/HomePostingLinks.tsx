import classNames from "classnames";
import { useTranslation } from "next-i18next";

import {
  IconIdentifier,
  Icon,
  BaseButton,
  PropsWithClassName,
} from "overwind-ui";

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
          className="flex h-32 flex-1 flex-col items-center justify-center rounded border border-gray-200 bg-secondary px-1.5 text-center hover:bg-gray-100 sm:px-3"
        >
          <Icon size="lg" icon={icon} className="text-gray-500" />

          <div className="mt-1.5 text-sm font-semibold text-gray-800 sm:text-base">
            {t(`posting-links.${i18nKey}.title`).toString()}
          </div>

          <div className="mt-0.5 text-xs text-gray-500 sm:text-gray-600">
            {t(`posting-links.${i18nKey}.desc`).toString()}
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
