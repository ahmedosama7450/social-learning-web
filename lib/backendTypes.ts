//-------------------------------------------
// EduOrgs
//-------------------------------------------

export type EduOrgValue = number | null;

export interface College {
  description: string;
  firstYear: number;
  lastYear: number;
}

export interface University {
  description: string;
  collegesIds: number[];
}

export enum TagType {
  SUBJECT = 0,
  TERM = 1,
  DEPARTMENT = 2,
}

export interface Tag {
  description: string;
  type: TagType;
  eduOrgs?: {
    universitiesIds: Array<EduOrgValue>;
    collegesIds: Array<EduOrgValue>;
    years: Array<EduOrgValue>;
  }[];
}

export type Universities = Record<number, University>;

export type Colleges = Record<number, College>;

export type Tags = Record<number, Tag>;

/**
 * This is not a direct type from the backend, because each field is sent as json(any) and this is what the json eventually looks like
 */
export type EduOrgs = {
  universities: Universities;
  colleges: Colleges;
  tags: Tags;
};
