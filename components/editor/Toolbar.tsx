import classNames from "classnames";
import { CustomElement } from "./custom-types";

import { useSlate } from "slate-react";

import { BaseButton, BaseIconProps, Icon } from "..";
import { CustomEditorUtils } from "./CustomEditor";
import React from "react";
import { ToolbarButton, ToolbarToggle } from "./ToolbarButton";

export const Toolbar = ({ className }: { className?: string }) => {
  return (
    <div className={classNames(className, "sticky z-40 pt-3 bg-white top-12")}>
      <div className="flex items-center gap-1 px-1 py-1 border border-gray-100 rounded bg-aside">
        <ToolbarToggle
          type="heading1"
          icon={{
            customIcon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z"
                  fill="currentColor"
                />
              </svg>
            ),
          }}
        />
        {/* <ToolbarButton
        type="heading"
        icon={{
          customIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0H24V24H0z" />
              <path
                d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z"
                fill="currentColor"
              />
            </svg>
          ),
        }}
      />
      <ToolbarButton
        type="heading"
        icon={{
          customIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0H24V24H0z" />
              <path
                d="M22 8l-.002 2-2.505 2.883c1.59.435 2.757 1.89 2.757 3.617 0 2.071-1.679 3.75-3.75 3.75-1.826 0-3.347-1.305-3.682-3.033l1.964-.382c.156.806.866 1.415 1.718 1.415.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75c-.286 0-.556.069-.794.19l-1.307-1.547L19.35 10H15V8h7zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z"
                fill="currentColor"
              />
            </svg>
          ),
        }}
      /> */}
        <ToolbarToggle
          type="quote"
          icon={{
            customIcon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"
                  fill="currentColor"
                />
              </svg>
            ),
          }}
        />
        <ToolbarToggle
          type="code-block"
          icon={{
            customIcon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M16.95 8.464l1.414-1.414 4.95 4.95-4.95 4.95-1.414-1.414L20.485 12 16.95 8.464zm-9.9 0L3.515 12l3.535 3.536-1.414 1.414L.686 12l4.95-4.95L7.05 8.464z"
                  fill="currentColor"
                />
              </svg>
            ),
          }}
        />
        <ToolbarToggle
          type="bulleted-list"
          icon={{
            customIcon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"
                  fill="currentColor"
                />
              </svg>
            ),
          }}
        />
        <ToolbarToggle
          type="numbered-list"
          icon={{
            customIcon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"
                  fill="currentColor"
                />
              </svg>
            ),
          }}
        />
        <div className="w-px h-6 bg-gray-200"></div>
        <ToolbarButton
          listener={() => {}}
          icon={{
            customIcon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M5 18l7.68-6L5 6V4h14v2H8.263L16 12l-7.737 6H19v2H5v-2z"
                  fill="currentColor"
                />
              </svg>
            ),
          }}
        />
        <ToolbarButton
          listener={() => {}}
          icon={{
            customIcon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M14 20v-2.157c1.863-1.192 3.5-3.875 3.5-6.959 0-3.073-2-6.029-5.5-6.029s-5.5 2.956-5.5 6.03c0 3.083 1.637 5.766 3.5 6.958V20H3v-2h4.76C5.666 16.505 4 13.989 4 10.884 4 6.247 7.5 3 12 3s8 3.247 8 7.884c0 3.105-1.666 5.621-3.76 7.116H21v2h-7z"
                  fill="currentColor"
                />
              </svg>
            ),
          }}
        />
        <div className="w-px h-6 bg-gray-200"></div>
        <ToolbarButton
          listener={() => {}}
          icon={{
            customIcon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"
                  fill="currentColor"
                />
              </svg>
            ),
          }}
        />
        <ToolbarButton
          listener={() => {}}
          icon={{
            customIcon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M18.172 7H11a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h7.172l-2.536-2.536L17.05 1.05 22 6l-4.95 4.95-1.414-1.414L18.172 7z"
                  fill="currentColor"
                />
              </svg>
            ),
          }}
        />
      </div>
    </div>
  );
};
