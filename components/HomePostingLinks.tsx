import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { IconIdentifier, Icon, BaseButton } from ".";
import { PropsWithClassName } from "../lib/types";

export const HomePostingLinks = ({ className }: PropsWithClassName<{}>) => {
  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        className,
        "flex items-center justify-between gap-4"
      )}
    >
      {homePostingLinks.map(({ icon, titleKey, descriptionKey, href }, i) => (
        <BaseButton
          key={i}
          type="next-link"
          href={href}
          className="flex flex-col items-center justify-center flex-1 h-32 px-1.5 text-center border border-gray-200 rounded sm:px-3 bg-secondary hover:bg-gray-100"
        >
          <Icon size="lg" icon={icon} className="text-gray-500" />

          <div className="mt-1.5 text-sm sm:text-base font-semibold text-gray-800">
            {t(`home:${titleKey}`)}
          </div>

          <div className="text-xs mt-0.5 text-gray-500 sm:text-gray-600">
            {t(`home:${descriptionKey}`)}
          </div>
        </BaseButton>
      ))}
    </div>
  );
};

const homePostingLinks: {
  icon: IconIdentifier;
  titleKey: string;
  descriptionKey: string;
  href: string;
}[] = [
  {
    icon: "heroicons-outline:pencil-alt",
    titleKey: "post-discussion-title",
    descriptionKey: "post-discussion-desc",
    href: "create-discussion",
  },
  {
    icon: "heroicons-outline:light-bulb",
    titleKey: "post-question-title",
    descriptionKey: "post-question-desc",
    href: "create-question",
  },
  {
    icon: "heroicons-outline:book-open",
    titleKey: "post-article-title",
    descriptionKey: "post-article-desc",
    href: "create-article",
  },
];
