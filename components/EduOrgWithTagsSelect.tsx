import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Disclosure } from "@headlessui/react";
import classNames from "classnames";
import { TFunction, useTranslation } from "next-i18next";
import React, { useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { Tags } from "../lib/backendTypes";
import { EDU_ORGS_GENERAL_OPTION_VALUE } from "../lib/backendValues";
import { findExistingTags } from "../lib/eduOrgsUtils";
import {
  Divider,
  Icon,
  Tag,
  TagActionType,
  EduOrgSelect,
  EduOrgSelectProps,
} from ".";

/**
 * university(number), college(number), year(number), tags(number[]) are assumed to be the names of fields
 */
export const EduOrgWithTagsSelect = ({
  eduOrgs,
  formMethods,
  structure,
  className,
}: Omit<EduOrgSelectProps, "structure"> & {
  structure: EduOrgSelectProps["structure"] | "side-by-side";
}) => {
  return (
    <div
      className={classNames(className, {
        "flex items-stretch gap-5": structure === "side-by-side",
      })}
    >
      <EduOrgSelect
        className="flex-1 flex-grow"
        eduOrgs={eduOrgs}
        formMethods={formMethods}
        structure={structure === "side-by-side" ? "aside" : structure}
      />

      {structure === "aside" && <Divider className="mt-3.5" />}

      <RegisteredTagsSelect
        formMethods={formMethods}
        tags={eduOrgs.tags}
        className={classNames("flex-grow flex-1", {
          "mt-4": structure !== "side-by-side",
        })}
      />
    </div>
  );
};

type RegisteredTagsSelectProps = Omit<
  TagsSelectProps,
  "value" | "onChange" | "existingTagsIds"
> & { formMethods: UseFormReturn<any> };

const RegisteredTagsSelect = ({
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
          {...rest}
          existingTagsIds={findExistingTags(
            rest.tags,
            watchUniversity,
            watchCollege,
            watchYear
          )}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
};

interface TagsSelectProps {
  value: number[];
  onChange: (value: number[]) => void;

  /* All tags, as the backend sends them */
  tags: Tags;

  /* Subset of tags that belong the selected edu org */
  existingTagsIds: number[];

  className?: string;
}

const TagsSelect = ({
  value: selectedTags,
  onChange: setSelectedTags,

  tags,
  existingTagsIds,

  className,
}: TagsSelectProps) => {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <div className="mb-2 form-label">{t("Tags")}</div>

      {existingTagsIds.length === 0 ? (
        <div className="text-sm text-gray-600">
          no tags exist in the selected edu org
        </div>
      ) : (
        <div className="px-3 py-3 bg-white border form-rounded">
          <TagsContainer
            actionType="remove"
            actionListener={(tagId) => {
              setSelectedTags(selectedTags.filter((el) => el != tagId));
            }}
            emptyStateText="no selected tags"
            tags={tags}
            containerTags={selectedTags}
            t={t}
          />
          <Disclosure as="div" className="mt-2" defaultOpen={true}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <Icon size="sm" faIcon={open ? faCaretDown : faCaretUp} />
                  {t("Existing Tags")}
                  {/* <Divider className="flex-grow" /> */}
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  <TagsContainer
                    className="mt-1.5"
                    actionType="add"
                    actionListener={(tagId) => {
                      setSelectedTags([...selectedTags, tagId]);
                    }}
                    emptyStateText="no more tags to add"
                    containerTags={existingTagsIds.filter(
                      (tagId) => !selectedTags.includes(tagId)
                    )}
                    tags={tags}
                    t={t}
                  />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      )}
    </div>
  );
};

const TagsContainer = ({
  className,

  containerTags,
  actionType,
  actionListener,
  emptyStateText,

  tags,
  t,
}: {
  className?: string;

  containerTags: number[];
  actionType: TagActionType;
  actionListener: (tagId: number) => void;
  emptyStateText: string;

  tags: Tags;
  t: TFunction;
}) => {
  return (
    <>
      {containerTags.length === 0 ? (
        <div className={classNames(className, "text-sm text-gray-600")}>
          {emptyStateText}
        </div>
      ) : (
        <div
          className={classNames(
            className,
            "flex flex-wrap items-center gap-1.5"
          )}
        >
          {containerTags.map((tagId) => (
            <Tag
              key={tagId}
              text={t(`edu-orgs:tags.${tagId}`)}
              type={tags[tagId].type}
              action={{
                type: actionType,
                listener: () => actionListener(tagId),
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

/* <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                {existingTagsIds.length === 0 ? (
                  <span className="text-sm text-gray-600">no tags to add</span>
                ) : (
                  existingTagsIds.flatMap((tagId) => {
                    // Include all tags except selected ones
                    if (selectedTags.includes(tagId)) {
                      return []; // Power of flatMap :)
                    }
                    return (
                      <Tag
                        key={tagId}
                        text={t(`edu-orgs:tags.${tagId}`)}
                        type={tags[tagId].type}
                        action={{
                          type: "add",
                          listener: () => {
                            setSelectedTags([...selectedTags, tagId]);
                          },
                        }}
                      />
                    );
                  })
                )}
              </div> */
