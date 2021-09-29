import { BaseField } from "./baseFields";
import { Icon } from "../Icon";
import { SearchIcon } from "@heroicons/react/solid";

export const SearchBar = ({ className }: { className?: string }) => {
  return (
    <BaseField
      className={className}
      fieldType="input"
      innerProps={{
        className: "pl-10 pr-14",
        placeholder: "Search...",
      }}
      borderless
      roundedFull
      filled
      leadingAddonProps={{
        className: "pl-3 text-gray-400",
        addon: <Icon hIcon={SearchIcon} size="md" />,
      }}
      /* trailingAddonProps={{
        className: "pr-2",
        pointerEventsEnabled: true,
        addon: (
          <Button size="xs" uppercaseText color="white-primary">
            Go
          </Button>
        ),
      }} */
    />
  );
};
