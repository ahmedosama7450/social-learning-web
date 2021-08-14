//-------------------------------------------
// EduOrgs
//-------------------------------------------

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
    universitiesIds?: number[];
    collegesIds?: number[];
    years?: number[];
  }[];
}

export type Universities = Record<number, University>;
export type Colleges = Record<number, College>;
export type Tags = Record<number, Tag>;

export type EduOrgs = {
  universities: Universities;
  colleges: Colleges;
  tags: Tags;
};
