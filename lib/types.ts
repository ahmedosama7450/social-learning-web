import { Control } from "react-hook-form";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type FullSize = Size | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
export type ExtraFullSize = FullSize | "7xl" | "8xl" | "9xl" | "10xl";

/**
 * Used to type custom registered controlled fields
 */
export interface RegisteredControlledFieldProps {
  name: string;
  defaultValue: unknown;
  control: Control<any>;
}

/**
 * Type utility to make one or more fields optional
 */
export type CustomPartial<T, K extends keyof T> = Pick<Partial<T>, K> &
  Omit<T, K>;

/**
 * Type utility to make one or more fields required
 */
export type CustomRequired<T, K extends keyof T> = Pick<Required<T>, K> &
  Omit<T, K>;

/**
 * Type utility to replace O keys in T with N type (which could be a type alias or interface)
 */
export type Replace<T, O extends keyof T, N> = Omit<T, O> & N;
