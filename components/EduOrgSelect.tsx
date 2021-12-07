import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";

import { RegisteredCustomSelectField } from ".";
import { EDU_ORGS_GENERAL_OPTION_VALUE } from "../lib/backendValues";
import { EduOrgs } from "../lib/backendTypes";
import { PropsWithClassName, EduOrg } from "../lib/types";
import {
  makeCollegesOptions,
  makeUniversitiesOptions,
  makeYearsOptions,
} from "../lib/eduOrgsUtils";

export type EduOrgSelectFormValues = EduOrg;

export type EduOrgSelectProps = PropsWithClassName<{
  eduOrgs: EduOrgs;
  formMethods: UseFormReturn<EduOrg>;
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

  const watchUniversity = watch("universityId", EDU_ORGS_GENERAL_OPTION_VALUE);
  const watchCollege = watch("collegeId", EDU_ORGS_GENERAL_OPTION_VALUE);

  // Reset college and year when university changes
  useEffect(() => {
    // TODO If the currently selected college exists in the new university, leave it as it is. Otherwise, set to general value
    setValue("collegeId", EDU_ORGS_GENERAL_OPTION_VALUE);
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
        name="universityId"
        defaultValue={EDU_ORGS_GENERAL_OPTION_VALUE}
        control={control}
        label={t("edu-orgs:university-label")}
        options={makeUniversitiesOptions(t, eduOrgs.universities)}
        className="col-span-1 sm:col-span-2"
        border="light"
        roundness="lg"
      />

      <RegisteredCustomSelectField
        name="collegeId"
        defaultValue={EDU_ORGS_GENERAL_OPTION_VALUE}
        control={control}
        label={t("edu-orgs:college-label")}
        options={makeCollegesOptions(
          t,
          eduOrgs.colleges,
          watchUniversity ? eduOrgs.universities[watchUniversity] : undefined
        )}
        className="col-span-1"
        border="light"
        roundness="lg"
      />

      <RegisteredCustomSelectField
        name="year"
        defaultValue={EDU_ORGS_GENERAL_OPTION_VALUE}
        control={control}
        label={t("edu-orgs:year-label")}
        options={makeYearsOptions(
          t,
          watchCollege ? eduOrgs.colleges[watchCollege] : undefined
        )}
        className="col-span-1"
        border="light"
        roundness="lg"
      />
    </div>
  );
};
