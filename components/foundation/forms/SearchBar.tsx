import { useTranslation } from "next-i18next";

import { Icon, InputField, IconButton } from "../../.";

// TODO Implement search functionality

export const SearchBar = ({
  className,
  collapseIntoIcon = false,
}: {
  className?: string;
  collapseIntoIcon?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <>
      {collapseIntoIcon ? (
        <IconButton
          className={className}
          type="button"
          iconProps={{
            icon: "heroicons-solid:search",
            size: "md",
          }}
          color="darkGray"
          dense
        />
      ) : (
        <InputField
          className={className}
          innerProps={{
            className: "pl-10",
            placeholder: t("common:search"),
          }}
          borderless
          filled
          roundness="xl"
          leadingAddonProps={{
            className: "pl-3",
            addon: (
              <Icon className="text-gray-400" icon="ri:search-line" size="sm" />
            ),
          }}
        />
      )}
    </>
  );
};
