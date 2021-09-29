import React from "react";
import { UserAvatar } from "./foundation/avatars/UserAvatar";
import { Icon } from "./foundation/Icon";
import {
  ChatIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import { BookmarkIcon, DotsHorizontalIcon } from "@heroicons/react/outline";

import classNames from "classnames";
import { IconButton } from "./foundation/buttons/IconButton";
import { Tag } from ".";
import { Button } from "./foundation/buttons/Button";
import { TagType } from "../lib/backendTypes";

import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { VotingButton } from "./VotingButton";
import { Post, PostProps } from "./Post";

export type DiscussionProps = Omit<
  PostProps,
  "type" | "viewsCount" | "answersCount"
>;

export const Discussion = ({ className, ...rest }: DiscussionProps) => {
  return <Post {...rest} type="discussion" />;
};

/*
          <div className="grid grid-cols-2 grid-rows-2 gap-2 mt-2 mb-3 max-h-96">
            <div className="relative border border-gray-300 rounded-lg">
              <Image
                src={BodyImage1}
                alt=""
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <Image
              src={BodyImage1}
              alt=""
              objectFit="cover"
              className="border-8 border-gray-300 rounded-lg"
            />
            <Image
              src={BodyImage1}
              alt=""
              objectFit="cover"
              className="border-8 border-gray-300 rounded-lg"
            />
            <Image
              src={BodyImage1}
              alt=""
              objectFit="cover"
              className="border-8 border-gray-300 rounded-lg"
            />
          </div>
          */
