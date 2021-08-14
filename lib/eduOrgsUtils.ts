import { TFunction } from "next-i18next";

import { CustomSelectFieldOption } from "../components/foundation/forms";
import { EDU_ORGS_GENERAL_OPTION_VALUE } from "./backendValues";
import { College, Universities, University } from "./backendTypes";

export function makeUniversitiesOptions(
  t: TFunction,
  universities: Universities,
  useShortNames?: boolean
): CustomSelectFieldOption[] {
  return [
    {
      value: EDU_ORGS_GENERAL_OPTION_VALUE,
      text: t("edu-orgs:general-university"),
    },
    ...Object.keys(universities).map((universityId) => {
      return {
        value: Number(universityId),
        text: t(
          `edu-orgs:universities.${universityId}.${
            useShortNames ? "shortName" : "name"
          }`
        ),
        imageSrc: `/universities-logos/${universityId}.png`, // logos must match this path
      };
    }),
  ];
}

export function makeCollegesOptions(
  t: TFunction,
  university?: University,
  useShortNames?: boolean
): CustomSelectFieldOption[] {
  const collegesOptions: CustomSelectFieldOption[] = [
    {
      value: EDU_ORGS_GENERAL_OPTION_VALUE,
      text: t("edu-orgs:general-college"),
    },
  ];

  if (university) {
    for (let collegeId of university.collegesIds) {
      collegesOptions.push({
        value: collegeId,
        text: t(
          `edu-orgs:colleges.${collegeId}.${
            useShortNames ? "shortName" : "name"
          }`
        ),
      });
    }
  }

  return collegesOptions;
}

export function makeYearsOptions(
  t: TFunction,
  college?: College,
  useShortNames?: boolean
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
        text: t(
          `edu-orgs:years.${year}.${useShortNames ? "shortName" : "name"}`
        ),
      });
    }
  }

  return yearsOptions;
}

/* export function findExistingTags(
  tags: Tags,
  universityId: number,
  collegeId: number,
  year: number
): number[] {
  console.log(universityId, collegeId, year);
  const existingTagsId: number[] = [];

  Object.entries(tags).forEach(([key, value]) => {
    const tagId = Number(key);
    if (
      (!value.eduOrgs || value.eduOrgs.length === 0) &&
      universityId == EDU_ORGS_GENERAL_OPTION_VALUE &&
      collegeId == EDU_ORGS_GENERAL_OPTION_VALUE &&
      year == EDU_ORGS_GENERAL_OPTION_VALUE
    ) {
      existingTagsId.push(tagId);
    } else {
             value.eduOrgs?.forEach((eduOrg) => {
        eduOrg.universitiesIds.forEach((_universityId) => {
          eduOrg.collegesIds.forEach((_collegeId) => {
            eduOrg.years.forEach((_year) => {
              console.log(_universityId, _collegeId, _year);
              console.log(universityId, collegeId, year);
              console.log("equals ??");
              console.log(
                universityId == _universityId &&
                  collegeId == _collegeId &&
                  year == _year
              );
              console.log("\n");

              if (
                universityId == _universityId &&
                collegeId == _collegeId &&
                year == _year
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
} */
