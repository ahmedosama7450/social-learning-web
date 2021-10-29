import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { Button, IconIdentifier, RegularDropdown } from ".";

export const HOME_SORTING_QUERY_NAME = "sorting";

export const MOST_ACTIVE_SORTING_OPTION = "most-active";
export const MOST_RECENT_SORTING_OPTION = "most-recent";
export const MOST_VOTES_SORTING_OPTION = "most-votes";

export const HomeSorter = ({ className }: { className?: string }) => {
  const { t } = useTranslation("home");
  const router = useRouter();

  const selectedOption =
    sortingOptions.find(
      ({ value }) => value === router.query[HOME_SORTING_QUERY_NAME]
    ) || sortingOptions[0];

  return (
    <RegularDropdown
      className={className}
      as={Button}
      size="lg"
      vPlacement="none"
      asProps={{
        // TODO Typescript: If this was a next-link or a, href isn't inferred
        type: "button",
        size: "sm",
        color: "transparent-darkGray",
        isIconTrailing: true,
        iconProps: { icon: "ri:arrow-down-s-line" },
        children: t(`sorting-options.${selectedOption.i18nKey}.text`),
      }}
      items={sortingOptions.map(({ value, i18nKey, icon }) => ({
        type: "next-link",
        text: t(`sorting-options.${i18nKey}.text`),
        description: t(`sorting-options.${i18nKey}.desc`),
        icon,
        // TODO Typescript href is always a Url type even when changing type
        href: {
          query: { ...router.query, [HOME_SORTING_QUERY_NAME]: value },
        },
        selected: value === selectedOption.value,
        divider: true,
      }))}
    />
  );
};

const sortingOptions: {
  value: string;
  i18nKey: string;
  icon: IconIdentifier;
}[] = [
  {
    value: MOST_ACTIVE_SORTING_OPTION,
    i18nKey: "most-active",
    icon: "ri:fire-fill",
  },
  {
    value: MOST_RECENT_SORTING_OPTION,
    i18nKey: "most-recent",
    icon: "ri:time-fill",
  },
  {
    value: MOST_VOTES_SORTING_OPTION,
    i18nKey: "most-votes",
    icon: "ri:arrow-right-up-fill",
  },
];
