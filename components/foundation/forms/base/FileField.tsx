import { useRef } from "react";

export type FileFieldProps = {
  children: (openFileBrowser: () => void) => React.ReactNode;
} & Omit<
  React.ComponentPropsWithoutRef<"input">,
  "children" | "className" | "type"
>;

export const FileField = ({ children, ...inputProps }: FileFieldProps) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <input {...inputProps} type="file" className="hidden" ref={ref} />

      {children(() => ref.current?.click())}
    </>
  );
};
