import { EduOrgValue } from "./backendTypes";

export interface EduOrg {
  universityId?: EduOrgValue;
  collegeId?: EduOrgValue;
  year?: EduOrgValue;
}

export type EduOrgWithTags = EduOrg & { tagsIds?: number[] };
