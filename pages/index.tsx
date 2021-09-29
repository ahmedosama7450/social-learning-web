import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { FilterIcon } from "@heroicons/react/solid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

import { useRouter } from "next/router";

import { SlideOver } from "../components/foundation/dialogs/SlideOver";

import { MobileSidebar } from "../__old__/MobileSidebar";

import {
  HomeSorter,
  MOST_ACTIVE_SORTING_OPTION,
} from "../components/HomeSorter";
import { HomeFilter } from "../components/HomeFilter";
import { Discussion } from "../components/Discussion";
import { SearchBar } from "../components/foundation/forms/SearchBar";
import {
  BellIcon,
  ChevronDownIcon,
  LightningBoltIcon,
} from "@heroicons/react/outline";
import { HomePostingLinks } from "../components/HomePostingLinks";
import { AsideLayout } from "../components/AsideLayout";
import { HomeTabs } from "../components/HomeTabs";
import { BaseDropdown } from "../components/foundation/dropdowns/BaseDropdown";
import { RegularDropdown } from "../components/foundation/dropdowns/RegularDropdown";
import { EduOrgsLoader } from "../components/extras/EduOrgsLoader";
import { sub } from "date-fns";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <EduOrgsLoader>
      {(eduOrgs) => (
        <AsideLayout
          title="Home"
          aside={
            <HomeFilter
              title="Filters"
              secondaryButton={{ text: "Revert", listener: () => {} }}
              submitButtonText="Apply"
              onSubmit={(data) => {
                router.push({ query: { ...router.query, ...data } });
              }}
            />
          }
        >
          <div className="pl-4 mt-3 mb-2 border-b border-gray-100">
            <HomePostingLinks />
            {/* <SearchBar className="pt-4 mt-4 border-t border-gray-100 " /> */}

            <div className="flex items-center justify-between mt-6">
              <HomeTabs />
              <HomeSorter />
            </div>
          </div>

          <ul className="pl-4">
            {[...Array(10)].map((e, i) => (
              <Discussion
                key={i}
                eduOrgs={eduOrgs}
                votesCount={5}
                commentsCount={10}
                sharesCount={8}
                creationDate={sub(new Date(), { days: 2 })}
                title="What's everyone's favorite number ?"
                content="How do I calculate the value of PI, You are enjoying reading it.
              While you are at, let me ask you if
              you really enjoyed by beautiful discussion"
                eduOrgWithTags={{
                  universityId: 1,
                  collegeId: 1,
                  year: 1,
                  tagsIds: [1, 2],
                }}
                id={1}
              />
            ))}
          </ul>
        </AsideLayout>
      )}
    </EduOrgsLoader>
  );
};

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

export default Home;
