import "../styles/globals.css";

import Head from "next/head";
import Script from "next/script";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { appWithTranslation } from "next-i18next";

import { useApollo } from "../lib/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        {/* TODO maybe use google fonts cdn instaed and make use of nextjs optimizations*/}
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
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
