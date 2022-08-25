import "../styles/index.css";

import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { appWithTranslation } from "next-i18next";
import { OverwindProvider } from "overwind-ui";

import { useApollo } from "../lib/apolloClient";

// Fixes forwardRef typing with generics according to https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
// Also, It breaks using displayName but It's not a big deal :)
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <OverwindProvider>
        <Component {...pageProps} />
      </OverwindProvider>
    </ApolloProvider>
  );
}

export default appWithTranslation(MyApp);
