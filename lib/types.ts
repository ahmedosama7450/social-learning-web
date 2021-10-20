import { Control, UseFormReturn } from "react-hook-form";

export type MiniSize = "sm" | "md" | "lg";
export type Size = "xs" | MiniSize | "xl";
export type FullSize = Size | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
export type ExtraFullSize = FullSize | "7xl" | "8xl" | "9xl" | "10xl";

export interface EduOrg {
  universityId?: number;
  collegeId?: number;
  year?: number;
}

export type EduOrgWithTags = EduOrg & { tagsIds?: number[] };

/**
 * Used to type custom registered controlled fields
 */
export interface RegisteredControlledFieldProps {
  name: string;
  defaultValue: unknown;
  control: Control<any>;
}

/**
 * Used to type custom registered uncontrolled fields
 */
export interface RegisteredUnControlledFieldProps {
  name: string;
  formMethods: UseFormReturn<any>;
}

/**
 * Type utility to make one or more fields optional
 */
export type SelectivePartial<T, K extends keyof T> = Pick<Partial<T>, K> &
  Omit<T, K>;

/**
 * Type utility to make one or more fields required
 */
export type SelectiveRequired<T, K extends keyof T> = Pick<Required<T>, K> &
  Omit<T, K>;

/**
 * Type utility to replace O keys in T with N type (which could be a type alias or interface)
 */
export type Replace<T, O extends keyof T, N> = Omit<T, O> & N;

export type ClickListener<T extends HTMLElement> = React.MouseEventHandler<T>;

export type ButtonClickLister = ClickListener<HTMLButtonElement>;

/**
 * Quickly type setState functions
 */
export type StateDispatcher<T> = React.Dispatch<React.SetStateAction<T>>;
