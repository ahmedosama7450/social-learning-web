import { useTranslation } from "next-i18next";
import classNames from "classnames";

import { Icon, InputField, IconButton } from "../../.";

// TODO Implement search functionality

// TODO Search bar is too big on firefox (probably a line height inconsistency)

export const SearchBar = ({ className }: { className?: string }) => {
  const { t } = useTranslation();

  return (
    <>
      <IconButton
        className={classNames(className, "block md:hidden")}
        type="button"
        iconProps={{
          icon: "heroicons-solid:search",
          size: "md",
        }}
        color="darkGray"
        dense
      />

      <InputField
        className={classNames(
          className,
          "hidden md:block md:w-48 lg:w-72 xl:w-96"
        )}
        innerProps={{
          className: "pl-10",
          placeholder: t("common:search"),
        }}
        border="none"
        filled
        roundness="xl"
        leadingAddonProps={{
          className: "pl-3",
          addon: (
            <Icon className="text-gray-400" icon="ri:search-line" size="sm" />
          ),
        }}
      />
    </>
  );
};
