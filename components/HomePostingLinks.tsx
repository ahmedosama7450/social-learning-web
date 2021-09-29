import classNames from "classnames";
import Link from "next/link";
import {
  BookOpenIcon,
  LightBulbIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";

import { BaseIconProps, Icon } from ".";

export const HomePostingLinks = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        className,
        "flex items-center justify-between gap-4"
      )}
    >
      {homePostButtons.map(({ icon, title, description, href }) => (
        <Link href={href} key={title}>
          <a className="flex flex-col items-center justify-center flex-1 h-32 px-3 text-center border border-gray-200 rounded bg-gray-50 hover:bg-gray-100">
            <Icon size="lg" {...icon} className="text-gray-500" />
            <div className="mt-1.5 text-base font-semibold text-gray-800">
              {title}
            </div>
            <div className="text-xs mt-0.5 text-gray-700">{description}</div>
          </a>
        </Link>
      ))}
    </div>
  );
};

const homePostButtons: {
  icon: BaseIconProps;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    icon: { hIcon: PencilAltIcon },
    title: "Make Discussion",
    description: "Go for a discussion if you want to discuss something",
    href: "create-discussion",
  },
  {
    icon: { hIcon: LightBulbIcon },
    title: "Ask Question",
    description: "Go for a question if you want to ask a question",
    href: "create-question",
  },
  {
    icon: { hIcon: BookOpenIcon },
    title: "Write Article",
    description: "Go for an article if you want to ask a question",
    href: "create-article",
  },
];
