import React from "react";
import { Control, UseFormReturn } from "react-hook-form";

export type MiniSize = "sm" | "md" | "lg";
export type FullMiniSize = MiniSize | "xl";
export type Size = "xs" | FullMiniSize;
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
 * Type utility to change the type of the specified field F of an interface T to the given type N (Plus making it required)
 */
export type RetypeField<T, F extends keyof T, N> = Omit<T, F> &
  {
    [key in F]-?: N;
  };

/**
 * Same as RetypeField except It makes the field optional
 */
export type RetypeOptionalField<T, F extends keyof T, N> = Omit<T, F> &
  {
    [key in F]?: N;
  };

/**
 * Type utility that adds N as union to the specified field F of an interface T (Plus making it required)
 */
export type AugmentField<T, F extends keyof T, N> = RetypeField<T, F, N | T[F]>;

/**
 * Same as AugmentField except It makes the field optional
 */
export type AugmentOptionalField<T, F extends keyof T, N> = RetypeOptionalField<
  T,
  F,
  N | T[F]
>;

export type ClickListener<T extends HTMLElement> = React.MouseEventHandler<T>;

export type ButtonClickLister = ClickListener<HTMLButtonElement>;

/**
 * Quickly type setState functions
 */
export type StateDispatcher<T> = React.Dispatch<React.SetStateAction<T>>;

export type PropsWithRequiredChildren<T> = T & { children: React.ReactNode };

// TODO Refactor existing types to use this utility
export type PropsWithClassName<T> = T & { className?: string };
