import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { FilterIcon } from "@heroicons/react/solid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

import {
  IconButton,
  UserAvatar,
  BaseButton,
  Logo,
} from "../components/foundation";
import { SlideOver } from "../components/foundation/dialogs/SlideOver";

import { MobileBottomNav } from "../../backend/__old__/MobileBottomNav";
import { MobileSidebar } from "./MobileSidebar";

import {
  HomeSorter,
  MOST_ACTIVE_SORTING_OPTION,
} from "../components/HomeSorter";
import { HomeFilter } from "../components/HomeFilter";
import { HomeSorter } from "./HomeSorterOld";
import { Discussion } from "../components/Discussion";
import { Sidebar } from "../components/Sidebar";

const Home: NextPage = () => {
  const [feedType, setFeedType] = useState(MOST_ACTIVE_SORTING_OPTION);

  return (
    <div className="max-w-6xl min-h-screen px-4 mx-auto bg-white">
      <div className="flex items-start justify-center">
        <Sidebar structure="normal" className="sticky top-0 w-[20%]" />

        <div className=" border-gray-100 w-[50%] border-l border-r">
          <header className="sticky top-0 z-50 flex items-center px-4 py-3 bg-white border-b border-gray-100">
            <div className="block sm:hidden">
              <SlideOver
                header={(ds) => <Logo />}
                headerDivider
                hasCloseButton
                innerCloseButton
                content={() => <MobileSidebar />}
              >
                {(ds) => (
                  <BaseButton onClick={() => ds.toggle()}>
                    <UserAvatar size="xl" />
                  </BaseButton>
                )}
              </SlideOver>
            </div>

            <span className="ml-5 font-semibold">Home</span>

            <HomeSorter
              value={feedType}
              setValue={setFeedType}
              className="ml-auto"
            />

            <SlideOver
              rightToLeft
              content={() => <HomeFilter structure="slideover" />}
            >
              {(ds) => (
                <IconButton
                  iconProps={{ hIcon: FilterIcon, size: "md" }}
                  hoverType="simple"
                  className="ml-4"
                  onClick={() => ds.toggle()}
                />
              )}
            </SlideOver>
          </header>

          <main>
            {/* <HomeSorter /> */}
            <ul>
              <Discussion />
              <Discussion />
              <Discussion />
              <Discussion />
              <Discussion />
              <Discussion />
              <Discussion />
              <Discussion />
              <Discussion />
              <Discussion />
              <Discussion />
            </ul>
          </main>
        </div>

        <HomeFilter
          structure="slideover"
          className="sticky flex-grow mx-5 my-4 top-4"
        />
      </div>

      <MobileBottomNav />
    </div>
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
