import { useEduOrgsInfoQuery } from "../../__generated__/graphql";
import { Loader } from "../Loader";
import {Error} from "../Error";
import { EduOrgs } from "../../lib/backendTypes";

export const EduOrgsLoader = ({
  children,
}: {
  children: (eduOrgs: EduOrgs) => JSX.Element;
}) => {
  const {
    data: eduOrgsInfoData,
    loading: eduOrgsInfoLoading,
    error: eduOrgsInfoError,
  } = useEduOrgsInfoQuery();

  if (eduOrgsInfoLoading) {
    return <Loader />;
  }

  if (eduOrgsInfoError) {
    return <Error />;
  }

  if (!eduOrgsInfoData?.eduOrgsInfo.eduOrgs) {
    // TODO Implement caching for edu orgs
    return <>Data is in cache</>;
  }

  return children(eduOrgsInfoData.eduOrgsInfo.eduOrgs);
};
