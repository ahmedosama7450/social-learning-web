import React from "react";
import { UserAvatar } from "./foundation/avatars/UserAvatar";
import { BaseIconProps, Icon } from "./foundation/Icon";
import {
  ChatIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  ShareIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import { BookmarkIcon, FlagIcon } from "@heroicons/react/outline";
import { ReactNode } from "react";
import Image from "next/image";

import classNames from "classnames";
import { IconButton } from "./foundation/buttons/IconButton";
import { Tag } from "../components";
import { Button } from "./foundation/buttons/Button";
import { EduOrgWithTags, TagType } from "../lib/backendTypes";

import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { VotingButton } from "./VotingButton";

import { RegularDropdown } from "./foundation/dropdowns/RegularDropdown";
import Tippy from "@tippyjs/react";

import { formatDistanceToNow, format } from "date-fns";
import { arSA as ar, enUS as en } from "date-fns/locale";

import { useRouter } from "next/router";
import { EduOrgs } from "../lib/backendTypes";

import { LibraryIcon, ClockIcon } from "@heroicons/react/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { displayEduOrg, getEduOrgDisplayName } from "../lib/eduOrgsUtils";
import { useTranslation } from "react-i18next";
import { BaseButton, DetailedUserAvatar } from ".";
/* import { faCaretRight, faCaretUp } from "@fortawesome/free-solid-svg-icons";
 */
export type PostType = "discussion" | "question" | "article";

export interface PostProps {
  type: PostType;
  id: number;
  user?: {
    id: number;
    avatar: string;
    firstName: string;
    lastName: string;
    reputation: number;
    verified: boolean;
  };
  eduOrgs: EduOrgs;

  creationDate: Date;
  eduOrgWithTags: EduOrgWithTags;

  votesCount: number;
  commentsCount?: number;
  answersCount?: number;
  sharesCount?: number;
  viewsCount?: number;

  title: string;
  content: string;

  className?: string;
}

export const Post = ({
  type,
  id,
  user,
  eduOrgs,

  creationDate,
  eduOrgWithTags,

  votesCount,
  commentsCount,
  answersCount,
  sharesCount,
  viewsCount,

  title,
  content,

  className,
}: PostProps) => {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <article className={className}>
      <div className="flex gap-3.5 border-b border-gray-100 py-4">
        <div className="flex-grow">
          {/* Header */}
          <div className="flex items-center gap-1">
            <div
              className={classNames("px-2 py-1 text-xs tracking-wide rounded", {
                "text-primary-600 bg-primary-100": type === "discussion",
                "text-red-600 bg-red-100": type === "question",
                "text-green-600 bg-green-100": type == "article",
              })}
            >
              {type === "discussion"
                ? "Discussion"
                : type === "question"
                ? "Question"
                : "Article"}
            </div>
            &middot;
            {/*&nbsp;*/}
            <Tippy content={format(creationDate, "pp - PPPP")}>
              <Button
                type="next-link"
                href="#"
                size="xs"
                color="gray"
                underlineOnHover
              >
                {formatDistanceToNow(creationDate, {
                  addSuffix: true,
                  includeSeconds: true,
                  locale: router.locale === "ar" ? ar : en,
                })}
              </Button>
            </Tippy>
            &middot;
            <Tippy
              content={displayEduOrg(eduOrgWithTags, t)}
              interactive={true}
            >
              <span tabIndex={0}>
                <Icon
                  hIcon={QuestionMarkCircleIcon}
                  size="sm"
                  className="text-gray-500"
                />
              </span>
            </Tippy>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {/* <Icon hIcon={LibraryIcon} size="md" className="text-gray-500" /> */}
              {eduOrgWithTags.tagsIds!.map((tagId) => {
                const tag = eduOrgs.tags[tagId];
                return (
                  <Tag key={tagId} text={tag.description} type={tag.type} />
                );
              })}
              {/* <div className="text-sm text-gray-500">
              [
              {displayEduOrg(
                {
                  universityId: eduOrgWithTags.universityId!,
                  collegeId: eduOrgWithTags.collegeId!,
                  year: eduOrgWithTags.year!,
                },
                t
              )}
              ]
            </div> */}
            </div>
            <RegularDropdown
              className="flex-shrink-0 ml-auto"
              as={IconButton}
              asProps={{
                type: "button",
                iconProps: { hIcon: DotsHorizontalIcon, size: "md" },
                color: "darkGray",
              }}
              size="sm"
              items={[
                {
                  text: "Bookmark",
                  icon: { hIcon: BookmarkIcon },
                },
                {
                  text: "Report",
                  icon: { hIcon: FlagIcon },
                  href: "#",
                },
                // Edit, Delete, ...
              ]}
            />
          </div>

          <div className="flex gap-3 mt-2">
            <div>
              <div className="">
                <BaseButton
                  type="next-link"
                  className="text-base font-semibold text-gray-700"
                  href="#"
                >
                  {title}
                </BaseButton>
              </div>
              {/* Body */}
              <div className="leading-6 text-gray-600 text-md">{content}</div>

              {/* Badges */}

              {/* Bottom Bar */}
              <div className="flex items-center gap-5 mt-1">
                <VotingButtons votesCount={votesCount} />

                {/* Comments */}
                {commentsCount && (
                  <BottomBarButton
                    icon={{ hIcon: ChatIcon }}
                    iconTooltip="Write Comment"
                    count={10}
                    text="Comments"
                  />
                )}

                {answersCount && (
                  <BottomBarButton
                    icon={{ hIcon: ChatIcon }}
                    iconTooltip="Write Answer"
                    count={10}
                    text="Answers"
                  />
                )}

                {/* Shares */}
                {sharesCount && (
                  <BottomBarButton
                    icon={{ hIcon: ShareIcon }}
                    iconTooltip="Share"
                    count={8}
                    text="Shares"
                  />
                )}

                {/* Views */}
                {viewsCount && (
                  <div className="flex items-center gap-2">
                    <Icon hIcon={EyeIcon} size="md" className="text-gray-500" />

                    <div className="font-medium text-gray-500">
                      <span className="text-sm">{viewsCount}</span>
                      &nbsp;
                      <span className="text-xs">Views</span>
                    </div>
                  </div>
                )}

                <BaseButton className="px-1.5 py-1.5 ml-auto rounded">
                  <DetailedUserAvatar />
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const VotingButtons = ({ votesCount }: { votesCount: number }) => {
  const [votingState, setVoting] = useState<"ideal" | "upVoted" | "downVoted">(
    "ideal"
  );

  return (
    <div className="flex items-center flex-shrink-0 gap-2">
      <VotingButton
        voted={votingState === "upVoted"}
        icon={{
          customIcon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.8 11.613v-.6H1.483L12 .835l10.517 10.178H16.2V20.4H7.8v-8.787z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          ),
        }}
        filledIcon={{
          customIcon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0L0 11.613h7.2V21h9.6v-9.387H24L12 0z"
                fill="currentColor"
              />
            </svg>
          ),
        }}
        color="primary"
        onClick={() => {
          setVoting((value) => (value === "upVoted" ? "ideal" : "upVoted"));
        }}
      />

      <div className="text-base font-medium text-gray-600">{votesCount}</div>

      <VotingButton
        voted={votingState === "downVoted"}
        icon={{
          customIcon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M16.2 12.387v.6H22.517L12 23.165 1.483 12.987H7.8V3.6h8.4v8.787z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
              </defs>
            </svg>
          ),
        }}
        filledIcon={{
          customIcon: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M12 24l12-11.613h-7.2V3H7.2v9.387H0L12 24z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
              </defs>
            </svg>
          ),
        }}
        color="red"
        onClick={() => {
          setVoting((value) => (value === "downVoted" ? "ideal" : "downVoted"));
        }}
      />
    </div>
  );
};

const BottomBarButton = ({
  icon,
  iconTooltip,
  count,
  text,
}: {
  icon: BaseIconProps;
  iconTooltip: string;
  count: number;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-2 ">
      <Tippy content={iconTooltip} placement="bottom">
        <IconButton
          iconProps={{
            ...icon,
            size: "md",
          }}
          color="darkGray"
          hoverType="simple"
        />
      </Tippy>

      <BaseButton className="text-xs font-semibold text-gray-500 hover:underline hover:text-gray-900">
        {count}&nbsp;{text}
      </BaseButton>
    </div>
  );
};

{
  /* <div className="flex justify-between mt-2 text-cool-gray-500">
                <svg viewBox="0 0 24 24" className="w-5 h-5 p-px fill-current">
                  <g>
                    <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                  </g>
                </svg>
                <svg viewBox="0 0 24 24" className="w-5 h-5 p-px fill-current">
                  <g>
                    <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                  </g>
                </svg>
                <svg viewBox="0 0 24 24" className="w-5 h-5 p-px fill-current">
                  <g>
                    <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                  </g>
                </svg>
                <svg viewBox="0 0 24 24" className="w-5 h-5 p-px fill-current">
                  <g>
                    <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
                    <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
                  </g>
                </svg>
              </div> */
}

{
  /* <svg viewBox="0 0 24 24" className="fill-current ">
                    <g>
                      <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                    </g>
                  </svg> */
}
{
  /* <svg viewBox="0 0 24 24" className="fill-current">
                    <g>
                      <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                    </g>
                  </svg> */
}

/*

        <IconButton
          iconProps={{
            customIcon: (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.8 11.613v-.6H1.483L12 .835l10.517 10.178H16.2V20.4H7.8v-8.787z"
                  stroke="currentColor"
                  strokeWidth="1.45"
                />
              </svg>
            ),
            size: "sm",
          }}
          color="gray"
        />
        <span className="font-medium text-green-500">+5</span>
        <IconButton
          iconProps={{
            customIcon: (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M16.2 12.387v.6H22.517L12 23.165 1.483 12.987H7.8V3.6h8.4v8.787z"
                    stroke="currentColor"
                    strokeWidth="1.45"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                  </clipPath>
                </defs>
              </svg>
            ),
            size: "sm",
          }}
          color="gray"
        />
 */
