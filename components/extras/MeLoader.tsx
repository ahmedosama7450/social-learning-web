import { useMeQuery, UserFragment } from "../../__generated__/graphql";
import { Loader } from "../foundation/Loader";
import { Error } from "../foundation/Error";

export const MeLoader = ({
  children,
}: {
  children: (me: UserFragment) => JSX.Element;
}) => {
  const { data: meData, loading: meLoading, error: meError } = useMeQuery();

  if (meLoading) {
    return <Loader />;
  }

  if (meError || !meData?.me) {
    return <Error />;
  }

  return children(meData.me);
};
