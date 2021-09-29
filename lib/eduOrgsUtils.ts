import { TFunction } from "next-i18next";

import { CustomSelectFieldOption } from "../components/foundation/forms";
import { EDU_ORGS_GENERAL_OPTION_VALUE } from "./backendValues";
import {
  College,
  Colleges,
  EduOrg,
  EduOrgs,
  Tags,
  Universities,
  University,
} from "./backendTypes";

export function getEduOrgDisplayName(
  idOrYear: number | string,
  useShortNames: boolean,
  type: "universities" | "colleges" | "years",
  t: TFunction
) {
  return t(
    `edu-orgs:${type}.${idOrYear}.${useShortNames ? "shortName" : "name"}`
  );
}

export function makeUniversitiesOptions(
  t: TFunction,
  universities: Universities,
  useShortNames: boolean = false
): CustomSelectFieldOption[] {
  return [
    {
      value: EDU_ORGS_GENERAL_OPTION_VALUE,
      text: t("edu-orgs:general-university"),
    },
    ...Object.keys(universities).map((universityId) => {
      return {
        value: Number(universityId),
        text: getEduOrgDisplayName(
          universityId,
          useShortNames,
          "universities",
          t
        ),
        imageSrc: `/universities-logos/${universityId}.png`, // logos must match this path
      };
    }),
  ];
}

export function makeCollegesOptions(
  t: TFunction,
  colleges: Colleges,
  university?: University,
  useShortNames: boolean = false
): CustomSelectFieldOption[] {
  const collegesOptions: CustomSelectFieldOption[] = [
    {
      value: EDU_ORGS_GENERAL_OPTION_VALUE,
      text: t("edu-orgs:general-college"),
    },
  ];

  const collegesIds = university
    ? university.collegesIds
    : Object.keys(colleges);

  for (let collegeId of collegesIds) {
    collegesOptions.push({
      value: collegeId,
      text: getEduOrgDisplayName(collegeId, useShortNames, "colleges", t),
    });
  }

  return collegesOptions;
}

export function makeYearsOptions(
  t: TFunction,
  college?: College,
  useShortNames: boolean = false
): CustomSelectFieldOption[] {
  const yearsOptions: CustomSelectFieldOption[] = [
    {
      value: EDU_ORGS_GENERAL_OPTION_VALUE,
      text: t("edu-orgs:general-year"),
    },
  ];

  if (college) {
    for (let year = college.firstYear; year <= college.lastYear; year++) {
      yearsOptions.push({
        value: year,
        text: getEduOrgDisplayName(year, useShortNames, "years", t),
      });
    }
  }

  return yearsOptions;
}

export function findExistingTags(
  tags: Tags,
  universityId: number,
  collegeId: number,
  year: number
): number[] {
  const existingTagsId: number[] = [];

  Object.entries(tags).forEach(([tagIdString, tag]) => {
    const tagId = Number(tagIdString);
    if (
      (!tag.eduOrgs || tag.eduOrgs.length === 0) &&
      universityId == EDU_ORGS_GENERAL_OPTION_VALUE &&
      collegeId == EDU_ORGS_GENERAL_OPTION_VALUE &&
      year == EDU_ORGS_GENERAL_OPTION_VALUE
    ) {
      existingTagsId.push(tagId);
    } else {
      tag.eduOrgs?.forEach((eduOrg) => {
        eduOrg.universitiesIds.forEach((tagEduOrgUniversityId) => {
          eduOrg.collegesIds.forEach((tagEduOrgCollegeId) => {
            eduOrg.years.forEach((tagEduOrgYear) => {
              if (
                universityId === tagEduOrgUniversityId &&
                collegeId === tagEduOrgCollegeId &&
                year === tagEduOrgYear
              ) {
                existingTagsId.push(tagId);
              }
            });
          });
        });
      });
    }
  });

  return existingTagsId;
}

export function displayEduOrg(
  { universityId, collegeId, year }: EduOrg,
  t: TFunction
) {
  let result: string = "";

  if (universityId) {
    result += getEduOrgDisplayName(universityId, true, "universities", t);
  }

  if (collegeId) {
    result += " - " + getEduOrgDisplayName(collegeId, true, "colleges", t);
  }

  if (year) {
    result += " - " + getEduOrgDisplayName(year, true, "years", t);
  }

  if (result === "") {
    result = t("edu-orgs:general");
  }

  return result;
}
