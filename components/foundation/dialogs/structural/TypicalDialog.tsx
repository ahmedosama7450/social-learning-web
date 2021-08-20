import { XIcon } from "@heroicons/react/solid";
import { Dialog } from "@headlessui/react";

import {
  BaseDialogProps,
  DefaultResultDataType,
  DialogState,
} from "./BaseDialog";
import { RegularDialog } from "./RegularDialog";
import { Button, ButtonColor, IconButton } from "../../buttons";

export type TypicalDialogProps<T = DefaultResultDataType> = {
  headerProps?: TypicalDialogHeaderProps;
  footerProps?: TypicalDialogFooterProps<T>;
} & BaseDialogProps<T>;

export function TypicalDialog<T = DefaultResultDataType>({
  children,
  headerProps,
  footerProps,
  ...baseProps
}: TypicalDialogProps<T>) {
  return (
    <RegularDialog
      {...baseProps}
      header={
        headerProps &&
        ((dialogState) => (
          <TypicalDialogHeader {...headerProps} dialogState={dialogState} />
        ))
      }
      footer={
        footerProps &&
        ((dialogState) => (
          <TypicalDialogFooter {...footerProps} dialogState={dialogState} />
        ))
      }
    >
      {(dialogState) => children(dialogState)}
    </RegularDialog>
  );
}

interface TypicalDialogFooterProps<T = DefaultResultDataType> {
  positiveButton?: {
    text: string;
    listener: (dialogState: DialogState<T>) => void;
    color?: ButtonColor;
  };
  negativeButton?: {
    text: string;
    listener?: (dialogState: DialogState<T>) => void;
  };
}

// TODO Probably provide another variant where the negative button is on the left and transparent like mantine dialog(https://mantine.dev/)
function TypicalDialogFooter<T = DefaultResultDataType>({
  dialogState,
  positiveButton,
  negativeButton,
}: TypicalDialogFooterProps<T> & { dialogState: DialogState<T> }) {
  return (
    <div className="flex justify-end gap-3 px-4 py-3 bg-gray-50">
      {negativeButton && (
        <Button
          onClick={() => {
            if (negativeButton.listener) {
              negativeButton.listener(dialogState);
            } else {
              dialogState.toggle();
            }
          }}
          color="white"
          size="sm"
          className="flex-1 w-auto sm:flex-initial"
        >
          {negativeButton.text}
        </Button>
      )}

      {positiveButton && (
        <Button
          onClick={() => {
            positiveButton.listener(dialogState);
          }}
          color={positiveButton.color || "primary"}
          size="sm"
          className="flex-1 w-auto sm:flex-initial"
        >
          {positiveButton.text}
        </Button>
      )}
    </div>
  );
}

interface TypicalDialogHeaderProps {
  title: string;
  hasCloseButton?: boolean;
}

function TypicalDialogHeader<T = DefaultResultDataType>({
  dialogState,
  title,
  hasCloseButton = true,
}: TypicalDialogHeaderProps & { dialogState: DialogState<T> }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <Dialog.Title as="h3" className="text-lg font-medium text-gray-600">
        {title}
      </Dialog.Title>

      {hasCloseButton && (
        <IconButton
          onClick={() => {
            dialogState.toggle();
          }}
          iconProps={{ hIcon: XIcon, size: "sm" }}
          color="darkGray"
        />
      )}
    </div>
  );
}
