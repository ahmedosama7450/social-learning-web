import { TFunction } from "next-i18next";

import { CustomSelectFieldOption } from "../components";
import {
  College,
  Colleges,
  Tags,
  Universities,
  University,
} from "./backendTypes";
import { EduOrg } from "./types";
import { EDU_ORGS_GENERAL_OPTION_VALUE } from "./backendValues";

export function makeUniversitiesOptions(
  t: TFunction,
  universities: Universities,
  useShortNames: boolean = false
): CustomSelectFieldOption[] {
  const universitiesOptions: CustomSelectFieldOption[] = [
    {
      value: EDU_ORGS_GENERAL_OPTION_VALUE,
      text: t("edu-orgs:general-university"),
    },
  ];

  for (let universityId in universities) {
    universitiesOptions.push({
      value: Number(universityId),
      text: getEduOrgDisplayName(
        t,
        universityId,
        useShortNames,
        "universities"
      ),
      imageSrc: `/universities-logos/${universityId}.png`, // logos must match this path
    });
  }

  return universitiesOptions;
}

export function makeCollegesOptions(
  t: TFunction,
  colleges: Colleges,
  university: University | undefined,
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
      value: Number(collegeId),
      text: getEduOrgDisplayName(t, collegeId, useShortNames, "colleges"),
    });
  }

  return collegesOptions;
}

export function makeYearsOptions(
  t: TFunction,
  college: College | undefined,
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
        text: getEduOrgDisplayName(t, year, useShortNames, "years"),
      });
    }
  }

  return yearsOptions;
}

export function findExistingTags(
  tags: Tags,
  { universityId, collegeId, year }: EduOrg
): number[] {
  const existingTagsId: number[] = [];

  for (let tagIdString in tags) {
    const tagId = Number(tagIdString);
    const tag = tags[tagId];

    if (tag.eduOrgs && tag.eduOrgs.length !== 0) {
      tag.eduOrgs.forEach((eduOrg) => {
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
    } else if (!universityId && !collegeId && !year) {
      existingTagsId.push(tagId);
    }
  }

  return existingTagsId;
}

export function displayEduOrg(
  t: TFunction,
  { universityId, collegeId, year }: EduOrg,
  separator: string = " - "
) {
  let result: string = "";

  if (universityId) {
    result += getEduOrgDisplayName(t, universityId, true, "universities");
  }

  if (collegeId) {
    result += separator + getEduOrgDisplayName(t, collegeId, true, "colleges");
  }

  if (year) {
    result += separator + getEduOrgDisplayName(t, year, true, "years");
  }

  if (result === "") {
    result = t("edu-orgs:general");
  }

  return result;
}

function getEduOrgDisplayName(
  t: TFunction,
  idOrYear: number | string,
  useShortNames: boolean,
  type: "universities" | "colleges" | "years"
) {
  return t(
    `edu-orgs:${type}.${idOrYear}.${useShortNames ? "shortName" : "name"}`
  );
}
