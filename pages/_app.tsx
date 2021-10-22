import "../styles/globals.css";
import "tippy.js/dist/tippy.css";

import Script from "next/script";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { appWithTranslation } from "next-i18next";

import { useApollo } from "../lib/apolloClient";

// Fixes forwardRef typing with generics
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
      <Script
        src="/node_modules/focus-visible/dist/focus-visible.min.js"
        strategy="beforeInteractive"
      />

      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default appWithTranslation(MyApp);
