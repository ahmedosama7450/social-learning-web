import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";

import { DiscussionEditor } from "../components/editor/DiscussionEditor";
import { AsideLayout } from "../components/AsideLayout";
import { HomeFilter } from "../components/HomeFilter";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { PhotographIcon } from "@heroicons/react/outline";
import { PaperClipIcon } from "@heroicons/react/solid";

import {
  Button,
  IconButton,
  RegisteredInputField,
  EduOrgsLoader,
  EduOrgWithTagsSelect,
} from "../components";

import BodyImage1 from "../public/temp-placeholders/image-4.jpg";

const CreateDiscussionPage: NextPage = () => {
  const formMethods = useForm();

  return (
    <AsideLayout
      title="Create discussion"
      aside={
        <HomeFilter
          title="Who is this discussion for ?"
          submitButtonText="Publish"
          onSubmit={(data) => {
            //
          }}
          secondaryButton={{ text: "Save as draft", listener: () => {} }}
        />
      }
    >
      <EduOrgsLoader>
        {(eduOrgs) => (
          <div className="pb-20 pl-4">
            {/* <div className="mb-2 text-lg font-medium text-gray-700">
              What do you want to discuss ?
            </div> */}

            <DiscussionEditor />
            {/* <div className="flex justify-start gap-3 pt-2 mt-2 border-t">
              <IconButton
                iconProps={{ hIcon: PhotographIcon, size: "lg" }}
                color="darkGray"
              />
              <IconButton
                iconProps={{ hIcon: PaperClipIcon, size: "lg" }}
                color="darkGray"
              />
            </div> */}
            {/* <div className="grid grid-cols-2 grid-rows-2 gap-2 mt-3 max-h-96"> */}
            {/* <div className="relative overflow-hidden border border-gray-300 rounded">
                <Image
                  src={BodyImage1}
                  alt=""
                  layout="responsive"
                  objectFit="cover"
                  className="rounded"
                />
              </div> */}
            {/* <div className="relative border border-gray-300 rounded-lg">
                <Image
                  src={BodyImage1}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div> */}
            {/* <Image
                src={BodyImage1}
                alt=""
                objectFit="cover"
                className="border-8 border-gray-300 rounded-lg"
              /> */}
            {/* <Image
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
              /> */}
            {/* </div> */}

            {/* <div className="mt-3 mb-3 text-lg font-medium text-gray-700">
              Who is this discussion for ?
            </div> */}
            {/* <EduOrgWithTagsSelect
              eduOrgs={eduOrgs}
              formMethods={formMethods}
              structure="side-by-side"
            /> */}

            {/* <div className="flex justify-end gap-3 mt-12">
              <Button size="sm" color="white">
                Save as draft
              </Button>
              <Button size="sm">Publish</Button>
            </div> */}
          </div>
        )}
      </EduOrgsLoader>
    </AsideLayout>
  );
};

export default CreateDiscussionPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "validation",
        "edu-orgs",
        "profile",
        "home",
      ])),
    },
  };
};
