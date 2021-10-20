import { RadioGroup } from "@headlessui/react";
import React, { useState } from "react";
import classNames from "classnames";

export const HomeSorters = () => {
  return (
    <div className="relative flex items-center px-6 py-4 border-b justify-evenly before:bottom-0 before:block before:h-px before:bg-primary before:absolute before:left-0 before:w-64">
      <div className="">Most Active</div>
      <div className="w-px h-6 bg-divider"></div>
      <span>Most Recent</span>
      <div className="w-px h-6 bg-divider"></div>

      <span>Most Voted</span>
    </div>
  );
};

const sortingOptions: { name: string }[] = [
  {
    name: "Trending",
  },
  {
    name: "Most Recent",
  },
  {
    name: "Most Voted",
  },
];

export const HomeSorter = ({ className }: { className?: string }) => {
  const [selected, setSelected] = useState(sortingOptions[0]);

  return (
    <div className="border-b">
      <RadioGroup
        as="div"
        value={selected}
        onChange={setSelected}
        className="flex items-center justify-between px-2"
      >
        {sortingOptions.map((sortingOption) => (
          <RadioGroup.Option
            key={sortingOption.name}
            value={sortingOption}
            className={({ active, checked }) =>
              classNames({
                /* "ring-2 ring-offset-2 ring-offset-primary-300 ring-white ring-opacity-60 rounded":
                  active, */
                /* "bg-primary-700 bg-opacity-75 text-white": checked,
                "bg-white": !checked, */
              })
            }
          >
            {({ active, checked }) => (
              <RadioGroup.Label
                as="p"
                className={classNames(
                  "font-medium cursor-pointer px-4 py-4",
                  checked
                    ? "text-gray-900 relative before:block before:absolute before:bg-primary before:h-1 before:bottom-0 before:inset-x-0"
                    : "text-gray-500"
                )}
              >
                {sortingOption.name}
              </RadioGroup.Label>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
};

/*

import classNames from "classnames";

export const HomeSorter = () => {
  return (
    <div className="flex items-center justify-between gap-3">
      <HomeSorterItem selected>Most Active</HomeSorterItem>
      <HomeSorterItem>Most Recent</HomeSorterItem>
      <HomeSorterItem>Most Voted</HomeSorterItem>
    </div>
  );
};

const HomeSorterItem = ({
  children,
  selected = false,
}: {
  children: string;
  selected?: boolean;
}) => {
  return (
    <div
      className={classNames("text-xs text-gray-500", {
        "text-white font-medium bg-primary px-2 py-1 rounded-full": selected,
      })}
    >
      {children}
    </div>
  );
};

export const HomeSorter = () => {
  return (
    <div className="flex items-center justify-between gap-3 text-gray-500 border border-gray-300 rounded">
      <div className="px-3 py-2 text-xs text-gray-800 bg-gray-200 border-r border-gray-300">
        Most Active
      </div>
      <div className="text-xs">Most Recent</div>
      <div className="w-px h-8 bg-gray-300"></div>
      <div className="pr-3 text-xs">Most Votes</div>
    </div>
  );
};

 */
