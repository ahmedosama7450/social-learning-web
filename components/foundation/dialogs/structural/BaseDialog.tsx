import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export type DefaultResultDataType = null;

export interface ResultDataHandler<T = DefaultResultDataType> {
  resultData: T;
  setResultData: Dispatch<SetStateAction<T>> | ((data: T) => void);
}

export interface DialogState<T = DefaultResultDataType> {
  isOpen: boolean;
  toggle: () => void;
  resultDataHandler?: ResultDataHandler<T>;
}

export type DialogReactNode<T = DefaultResultDataType> = (
  dialogState: DialogState<T>
) => React.ReactNode;

export interface BaseDialogProps<T = DefaultResultDataType> {
  /** Mostly a button. Invoke ds.toggle() in its onClick listener */
  children: DialogReactNode<T>;
  content: DialogReactNode<T>;

  initialFocus?: React.MutableRefObject<HTMLElement>;
  autoClose?: boolean;
  resultDataHandler?: ResultDataHandler<T>;

  /** Fired before the dialog opens or closes */
  onToggle?: (ds: DialogState<T>) => void;
}

// TODO Maybe we should accept render as children. It's like if you want to insert a dialog, just wrap it in a dialog tag. so, dialog children will become content, instead
// TODO Provide a size prop (Examine tailwind new dialog examples)
export function BaseDialog<T = DefaultResultDataType>({
  children,
  content,

  initialFocus,
  autoClose = true,
  resultDataHandler,

  onToggle,
}: BaseDialogProps<T>) {
  const [isOpen, setOpen] = useState(false);

  const dialogState: DialogState<T> = {
    isOpen,
    toggle: () => {
      if (onToggle) onToggle(dialogState);
      setOpen((wasOpen) => !wasOpen);
    },
    resultDataHandler,
  };

  return (
    <>
      {children(dialogState)}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-50 overflow-y-auto"
          initialFocus={initialFocus}
          open={isOpen}
          onClose={() => {
            if (autoClose) {
              if (onToggle) onToggle(dialogState);
              setOpen(false);
            }
          }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block w-full max-w-lg my-8 overflow-hidden text-left align-middle transition-all bg-white rounded-lg shadow-xl">
                {content(dialogState)}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
