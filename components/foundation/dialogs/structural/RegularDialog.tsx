import {
  BaseDialog,
  BaseDialogProps,
  DefaultResultDataType,
  DialogReactNode,
} from './BaseDialog';

export type RegularDialogProps<T = DefaultResultDataType> = {
  header?: DialogReactNode<T>;
  footer?: DialogReactNode<T>;
} & BaseDialogProps<T>;

export function RegularDialog<T = DefaultResultDataType>({
  children,
  header,
  footer,
  ...baseProps
}: RegularDialogProps<T>) {
  return (
    <BaseDialog {...baseProps}>
      {(dialogState) => (
        <>
          {header && header(dialogState)}
          {children && children(dialogState)}
          {footer && footer(dialogState)}
        </>
      )}
    </BaseDialog>
  );
}
