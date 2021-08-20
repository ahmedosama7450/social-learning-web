import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import classNames from "classnames";

import {
  BaseDialogProps,
  DefaultResultDataType,
  DialogReactNode,
  DialogState,
} from "./structural/BaseDialog";
import { IconButton } from "../buttons/IconButton";

// TODO You might want to check out tailwind ecommerce slide overs
// TODO Mobile bottom sheet ??

export type SlideOverProps<T = DefaultResultDataType> = {
  header?: DialogReactNode<T>;
  headerDivider?: boolean;

  rightToLeft?: boolean;
  fullScreen?: boolean;

  hasCloseButton?: boolean;
  innerCloseButton?: boolean;
} & BaseDialogProps<T>;

export function SlideOver<T = DefaultResultDataType>({
  header,
  headerDivider = false,

  rightToLeft = false,
  fullScreen = false,

  hasCloseButton = true,
  innerCloseButton = false,

  children,
  render,
  initialFocus,
  autoClose = true,
  resultDataHandler,
}: SlideOverProps<T>) {
  const [isOpen, setOpen] = useState(false);

  const dialogState: DialogState<T> = {
    isOpen,
    toggle: () => setOpen((wasOpen) => !wasOpen),
    resultDataHandler,
  };

  return (
    <>
      {render(dialogState)}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-50 overflow-hidden"
          initialFocus={initialFocus}
          open={isOpen}
          onClose={() => {
            if (autoClose) setOpen(false);
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            </Transition.Child>
            <div
              className={classNames("fixed inset-y-0 flex max-w-full", {
                "right-0 pl-10": rightToLeft,
                "left-0 pr-10": !rightToLeft,
              })}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom={
                  rightToLeft ? "translate-x-full" : "-translate-x-full"
                }
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo={rightToLeft ? "translate-x-full" : "-translate-x-full"}
              >
                <div
                  className={classNames("relative max-w-md", {
                    "w-screen": fullScreen,
                    "w-3/4-screen": !fullScreen,
                  })}
                >
                  {hasCloseButton && !innerCloseButton && (
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div
                        className={classNames("absolute top-0 flex pt-4", {
                          "left-0 pr-2 -ml-8 sm:-ml-10 sm:pr-4": rightToLeft,
                          "right-0 pl-2 -mr-8 sm:-mr-10 sm:pl-4": !rightToLeft,
                        })}
                      >
                        <IconButton
                          iconProps={{ hIcon: XIcon, size: "md" }}
                          onClick={() => setOpen(false)}
                          color="lightGray"
                          hoverType="simpleWhite"
                        />
                      </div>
                    </Transition.Child>
                  )}
                  <div className="h-full overflow-y-auto bg-white shadow-xl">
                    {header && (
                      <div
                        className={classNames("px-4 sm:px-6 pt-6 pb-5", {
                          "border-b": headerDivider,
                          "flex justify-between items-center":
                            hasCloseButton && innerCloseButton,
                        })}
                      >
                        {/* TODO  Dialog.Title is rendered as h2, what if the header is an image ??*/}
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {header(dialogState)}
                        </Dialog.Title>
                        {hasCloseButton && innerCloseButton && (
                          <IconButton
                            onClick={() => setOpen(false)}
                            iconProps={{ hIcon: XIcon, size: "md" }}
                            hoverType="simple"
                            color="gray"
                          />
                        )}
                      </div>
                    )}
                    <div
                      className={classNames("relative", {
                        "px-4 sm:px-6": header,
                      })}
                    >
                      {children(dialogState)}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
