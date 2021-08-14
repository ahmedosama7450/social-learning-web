import classNames from "classnames";
import { useTranslation } from "next-i18next";
import React from "react";
import { UseFormReturn } from "react-hook-form";

import { RegisteredCustomSelectField } from "./foundation/forms";
import { Divider } from "./foundation/Divider";
import { EDU_ORGS_GENERAL_OPTION_VALUE } from "../lib/backendValues";
import { EduOrgs } from "../lib/backendTypes";
import {
  makeCollegesOptions,
  makeUniversitiesOptions,
  makeYearsOptions,
} from "../lib/eduOrgsUtils";

export interface EduOrgSelectProps {
  eduOrgs: EduOrgs;
  formMethods: UseFormReturn<any>;
  structure: "normal" | "aside";
  className?: string;
}

/**
 * university, college and year are assumed to be the names of the fields
 */
export const EduOrgSelect = ({
  eduOrgs,
  formMethods,
  structure,
  className,
}: EduOrgSelectProps) => {
  const { t } = useTranslation();

  const { control, setValue, watch } = formMethods;

  const watchUniversityId: number = watch(
    "university",
    EDU_ORGS_GENERAL_OPTION_VALUE
  );
  const watchCollegeId: number = watch(
    "college",
    EDU_ORGS_GENERAL_OPTION_VALUE
  );

  return (
    <div
      className={classNames(className, {
        "grid sm:grid-cols-2 gap-y-5 gap-x-5 mt-5 grid-cols-1":
          structure === "normal",
        "space-y-4": structure === "aside",
      })}
    >
      <RegisteredCustomSelectField
        name="university"
        defaultValue={EDU_ORGS_GENERAL_OPTION_VALUE}
        control={control}
        label={t("common:university-label")}
        options={makeUniversitiesOptions(t, eduOrgs.universities)}
        onChange={() => {
          setValue("college", EDU_ORGS_GENERAL_OPTION_VALUE);
          setValue("year", EDU_ORGS_GENERAL_OPTION_VALUE);
        }}
        className="col-span-1 sm:col-span-2"
      />

      {structure === "aside" && <Divider />}

      <RegisteredCustomSelectField
        name="college"
        defaultValue={EDU_ORGS_GENERAL_OPTION_VALUE}
        control={control}
        label={t("common:college-label")}
        options={makeCollegesOptions(
          t,
          eduOrgs.universities[watchUniversityId]
        )}
        onChange={() => {
          setValue("year", EDU_ORGS_GENERAL_OPTION_VALUE);
        }}
        className="col-span-1"
      />

      {structure === "aside" && <Divider />}

      <RegisteredCustomSelectField
        name="year"
        defaultValue={EDU_ORGS_GENERAL_OPTION_VALUE}
        control={control}
        label={t("common:year-label")}
        options={makeYearsOptions(t, eduOrgs.colleges[watchCollegeId])}
        className="col-span-1"
      />
    </div>
  );
};
