import "../styles/globals.css";
import "tippy.js/dist/tippy.css";

import Head from "next/head";
import Script from "next/script";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { appWithTranslation } from "next-i18next";

import { useApollo } from "../lib/apolloClient";

declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        {/* TODO maybe use google fonts cdn instaed and make use of nextjs optimizations*/}
        {/* <link rel="stylesheet" href="https://rsms.me/inter/inter.css" /> */}
      </Head>

      <Script
        src="/node_modules/focus-visible/dist/focus-visible.min.js"
        strategy="beforeInteractive"
      />

      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default appWithTranslation(MyApp);
