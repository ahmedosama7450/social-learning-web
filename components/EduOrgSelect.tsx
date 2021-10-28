import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";

import { RegisteredCustomSelectField } from ".";
import { EDU_ORGS_GENERAL_OPTION_VALUE } from "../lib/backendValues";
import { EduOrgs } from "../lib/backendTypes";
import { PropsWithClassName } from "../lib/types";
import {
  makeCollegesOptions,
  makeUniversitiesOptions,
  makeYearsOptions,
} from "../lib/eduOrgsUtils";

export interface EduOrgSelectFormValues {
  university: number;
  college: number;
  year: number;
}

export type EduOrgSelectProps = PropsWithClassName<{
  eduOrgs: EduOrgs;
  formMethods: UseFormReturn<EduOrgSelectFormValues>;
  structure: "normal" | "aside";
}>;

export const EduOrgSelect = ({
  eduOrgs,
  formMethods,
  structure,
  className,
}: EduOrgSelectProps) => {
  const { t } = useTranslation();

  const { control, setValue, watch } = formMethods;

  const watchUniversity = watch("university", EDU_ORGS_GENERAL_OPTION_VALUE);
  const watchCollege = watch("college", EDU_ORGS_GENERAL_OPTION_VALUE);

  // Reset college and year when university changes
  useEffect(() => {
    // TODO If the currently selected college exists in the new university, leave it as it is. Otherwise, set to general value
    setValue("college", EDU_ORGS_GENERAL_OPTION_VALUE);
    setValue("year", EDU_ORGS_GENERAL_OPTION_VALUE);
  }, [watchUniversity, setValue]);

  // Reset year when college changes
  useEffect(() => {
    // TODO If the currently selected year exists in the new college, leave it as it is. Otherwise, set to general value
    setValue("year", EDU_ORGS_GENERAL_OPTION_VALUE);
  }, [watchCollege, setValue]);

  return (
    <div
      className={classNames(className, {
        "grid grid-cols-1 sm:grid-cols-2 gap-5": structure === "normal",
        "space-y-3.5": structure === "aside",
      })}
    >
      <RegisteredCustomSelectField
        name="university"
        defaultValue={EDU_ORGS_GENERAL_OPTION_VALUE}
        control={control}
        label={t("edu-orgs:university-label")}
        options={makeUniversitiesOptions(t, eduOrgs.universities)}
        className="col-span-1 sm:col-span-2"
        border="extraLight"
        roundness="lg"
      />

      <RegisteredCustomSelectField
        name="college"
        defaultValue={EDU_ORGS_GENERAL_OPTION_VALUE}
        control={control}
        label={t("edu-orgs:college-label")}
        options={makeCollegesOptions(
          t,
          eduOrgs.colleges,
          eduOrgs.universities[watchUniversity]
        )}
        className="col-span-1"
        border="extraLight"
        roundness="lg"
      />

      <RegisteredCustomSelectField
        name="year"
        defaultValue={EDU_ORGS_GENERAL_OPTION_VALUE}
        control={control}
        label={t("edu-orgs:year-label")}
        options={makeYearsOptions(t, eduOrgs.colleges[watchCollege])}
        className="col-span-1"
        border="extraLight"
        roundness="lg"
      />
    </div>
  );
};
