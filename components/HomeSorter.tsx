import { ClockIcon, FireIcon, SparklesIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

import { Button, RegularDropdown, RegularDropdownItem } from ".";

export const URL_SORTING_QUERY_NAME = "sorting";

export const MOST_ACTIVE_SORTING_OPTION = "most-active";
export const MOST_RECENT_SORTING_OPTION = "most-recent";
export const MOST_VOTES_SORTING_OPTION = "most-votes";

const sortingOptions: ({ value: string } & Required<
  Pick<RegularDropdownItem<any>, "text" | "description" | "icon">
>)[] = [
  {
    value: MOST_ACTIVE_SORTING_OPTION,
    text: "Most Active",
    description: "Most active discussions will show up first",
    icon: { hIcon: FireIcon },
  },
  {
    value: MOST_RECENT_SORTING_OPTION,
    text: "Most Recent",
    description: "Most recent discussions will show up first",
    icon: { hIcon: ClockIcon },
  },
  {
    value: MOST_VOTES_SORTING_OPTION,
    text: "Most Votes",
    description: "Discussions with most votes will show up first",
    icon: { hIcon: SparklesIcon },
  },
];

export const HomeSorter = ({ className }: { className?: string }) => {
  const router = useRouter();

  const selectedOption =
    sortingOptions.find(
      ({ value }) => value === router.query[URL_SORTING_QUERY_NAME]
    ) || sortingOptions[0];

  return (
    <RegularDropdown
      className={className}
      as={Button}
      size="lg"
      spacing="away"
      asProps={{
        size: "sm",
        color: "darkGray",
        iconProps: { hIcon: ChevronDownIcon, isTrailing: true },
        children: selectedOption.text,
      }}
      items={sortingOptions.map(({ value, text, description, icon }) => ({
        type: "next-link",
        text,
        description,
        icon,
        href: {
          query: { ...router.query, [URL_SORTING_QUERY_NAME]: value },
        },
        selected: value === selectedOption.value,
        divider: true,
      }))}
    />
  );
};
