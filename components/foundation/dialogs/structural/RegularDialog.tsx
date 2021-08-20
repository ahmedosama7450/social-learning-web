import {
  BaseDialog,
  BaseDialogProps,
  DefaultResultDataType,
  DialogReactNode,
} from "./BaseDialog";

export type RegularDialogProps<T = DefaultResultDataType> = {
  header?: DialogReactNode<T>;
  footer?: DialogReactNode<T>;
} & BaseDialogProps<T>;

export function RegularDialog<T = DefaultResultDataType>({
  content,
  header,
  footer,
  ...baseProps
}: RegularDialogProps<T>) {
  return (
    <BaseDialog
      {...baseProps}
      content={(dialogState) => (
        <>
          {header && header(dialogState)}
          {content && content(dialogState)}
          {footer && footer(dialogState)}
        </>
      )}
    />
  );
}
