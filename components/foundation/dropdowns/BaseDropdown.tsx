import { Fragment, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Size } from "../../../lib/types";
import classNames from "classnames";

export interface BaseDropdownProps {
  /* Dropdown button */
  children: ReactNode;
  items: ReactNode;

  size?: Size;
  spacing?: "attached" | "away";

  className?: string;
}

export const BaseDropdown = ({
  children,
  items,

  size = "md",
  spacing = "attached",

  className,
}: BaseDropdownProps) => {
  return (
    <Menu as="div" className={classNames(className, "relative text-left")}>
      <div>{children}</div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            "absolute right-0 z-40 w-56 origin-top-right bg-white rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            {
              "mt-1.5": spacing === "away",

              "w-44": size === "xs",
              "w-56": size === "sm",
              "w-64": size === "md",
              "w-72": size === "lg",
              "w-80": size === "xl",
            }
          )}
        >
          {items}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
