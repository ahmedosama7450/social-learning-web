import classNames from "classnames";
import { TFunction, useTranslation } from "next-i18next";
import { useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Disclosure } from "@headlessui/react";

import {
  BaseButton,
  EduOrgSelectFormValues,
  Tag,
  TagActionType,
  Icon,
} from ".";
import { Tags } from "../lib/backendTypes";
import { EDU_ORGS_GENERAL_OPTION_VALUE } from "../lib/backendValues";
import { findExistingTags } from "../lib/eduOrgsUtils";
import { PropsWithClassName } from "../lib/types";

export interface TagsSelectProps {
  value: number[];
  onChange: (value: number[]) => void;

  /** All tags, as the backend sends them */
  tags: Tags;

  /** Subset of tags that belong the selected edu org (We assume that all these ids are valid and existent in the tags object) */
  existingTagsIds: number[];
}

export const TagsSelect = ({
  value: selectedTagsIds,
  onChange: setSelectedTagsIds,

  tags,
  existingTagsIds,

  className,
}: PropsWithClassName<TagsSelectProps>) => {
  const { t } = useTranslation();

  return (
    <>
      {existingTagsIds.length === 0 ? (
        // TODO Create a better empty state
        <div className={classNames(className, "text-sm text-gray-700")}>
          {t("edu-orgs:tags-empty-state")}
        </div>
      ) : (
        <div className={className}>
          <TagsContainer
            containerTagsIds={selectedTagsIds}
            tagsAction={{
              type: "remove",
              listener: (tagId) => {
                // Remove tagId from selected tags
                setSelectedTagsIds(selectedTagsIds.filter((el) => el != tagId));
              },
            }}
            emptyStateTextKey={t("edu-orgs:no-selected-tags-empty-state")}
            className="mb-2.5"
            tags={tags}
            t={t}
          />

          <Disclosure defaultOpen={true}>
            <Disclosure.Button
              as={BaseButton}
              type="button"
              className="flex items-center w-full pb-1 border-b"
            >
              {({ open }) => (
                <>
                  <Icon
                    icon="ri:arrow-down-s-fill"
                    size="md"
                    vFlip={!open}
                    className="flex-shrink-0 -ml-1 text-gray-500"
                  />

                  <div className="text-xs font-medium tracking-wide text-gray-600">
                    {t("Existing Tags")}
                  </div>
                </>
              )}
            </Disclosure.Button>

            <Disclosure.Panel>
              <TagsContainer
                containerTagsIds={existingTagsIds.filter(
                  (tagId) => !selectedTagsIds.includes(tagId)
                )}
                tagsAction={{
                  type: "add",
                  listener: (tagId) => {
                    // Add tagId to selected tags
                    setSelectedTagsIds(selectedTagsIds.concat(tagId));
                  },
                }}
                emptyStateTextKey="edu-orgs:no-more-tags-to-add-empty-state"
                className="mt-2.5"
                tags={tags}
                t={t}
              />
            </Disclosure.Panel>
          </Disclosure>
        </div>
      )}
    </>
  );
};

const TagsContainer = ({
  containerTagsIds,
  tagsAction,
  emptyStateTextKey,

  tags,
  t,

  className,
}: PropsWithClassName<{
  containerTagsIds: number[];
  tagsAction: {
    type: TagActionType;
    listener: (tagId: number) => void;
  };
  emptyStateTextKey: string;

  tags: Tags;
  t: TFunction;
}>) => {
  return (
    <>
      {containerTagsIds.length === 0 ? (
        <div className={classNames(className, "text-sm text-gray-700")}>
          {/* TODO Create a better empty state */}
          {emptyStateTextKey}
        </div>
      ) : (
        <div
          className={classNames(
            className,
            "flex flex-wrap items-center gap-1.5"
          )}
        >
          {containerTagsIds.map((tagId) => (
            <Tag
              key={tagId}
              text={t(`edu-orgs:tags.${tagId}`)}
              type={tags[tagId].type}
              action={{
                type: tagsAction.type,
                listener: () => tagsAction.listener(tagId),
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export type TagsSelectFormValues = EduOrgSelectFormValues & {
  tags: number[];
};

export type RegisteredTagsSelectProps = Omit<
  TagsSelectProps,
  "value" | "onChange" | "existingTagsIds"
> & { formMethods: UseFormReturn<TagsSelectFormValues> };

export const RegisteredTagsSelect = ({
  formMethods,
  ...rest
}: RegisteredTagsSelectProps) => {
  const { watch, setValue } = formMethods;

  const watchUniversity = watch("university", EDU_ORGS_GENERAL_OPTION_VALUE);
  const watchCollege = watch("college", EDU_ORGS_GENERAL_OPTION_VALUE);
  const watchYear = watch("year", EDU_ORGS_GENERAL_OPTION_VALUE);

  // Reset tags when edu org changes
  useEffect(() => {
    setValue("tags", []);
  }, [watchUniversity, watchCollege, watchYear, setValue]);

  return (
    <Controller
      name="tags"
      defaultValue={[]}
      control={formMethods.control}
      render={({ field }) => (
        <TagsSelect
          value={field.value}
          onChange={field.onChange}
          existingTagsIds={findExistingTags(
            rest.tags,
            watchUniversity,
            watchCollege,
            watchYear
          )}
          {...rest}
        />
      )}
    />
  );
};
