// TODO Create a real landing page and handle authentication edge cases

import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";

import { Provider, useLoginMutation } from "../__generated__/graphql";

declare global {
  interface Window {
    gapi: any;
  }
}

const LandingPage: NextPage = () => {
  const router = useRouter();
  const [loginWithProvider, { loading, error, called }] = useLoginMutation({
    onCompleted({ loginWithProvider }) {
      if (loginWithProvider) {
        router.replace("/");
      }
    },
  });

  const [scriptStatus, setScriptStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");

  useEffect(() => {
    const googleScript = document.getElementById(
      "google-script"
    ) as HTMLScriptElement;
    googleScript.onload = () => {
      setScriptStatus("loaded"); // TODO use nextjs script onload
    };

    googleScript.onerror = () => {
      setScriptStatus("error");
    };
  }, []);

  if (called && loading) return <>Loading...</>;
  if (error) return <>Error, reload page</>;

  function insertScript(src: string, parent: HTMLElement = document.head) {
    const script: HTMLScriptElement = document.createElement("script");
    script.src = src;
    script.async = true;
    parent.appendChild(script);
    return script;
  }

  function reloadScript(script: HTMLScriptElement) {
    // Remove old script and insert a new one
    const parent = script.parentElement;
    script.remove();
    return insertScript(script.src, parent!);
  }

  function loginWithGoogle() {
    const showGooglePopup = () => {
      // TODO Probably show a loading modal until popup opens
      window.gapi.load("auth2", function () {
        const auth2 = window.gapi.auth2.init({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          // Scopes to request in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        auth2
          .grantOfflineAccess()
          .then((authResult: any) => {
            const code = authResult["code"];
            if (code) {
              login(Provider.Google, code);
            } else {
              // Just in case
              // TODO toast error
            }
          })
          .catch(() => {
            // There was an error
            // TODO toast error
          });
      });
    };

    if (scriptStatus === "loaded") {
      // We are good to use gapi
      showGooglePopup();
    } else {
      const showGooglePopupOnload = (script: HTMLScriptElement) => {
        // TODO Show a loading modal until popup opens
        script.onload = () => {
          showGooglePopup();
        };
        script.onerror = () => {
          // TODO toast error
        };
      };

      const googleScript = document.getElementById(
        "google-script"
      ) as HTMLScriptElement;

      if (scriptStatus === "error") {
        // Try to reload script
        showGooglePopupOnload(reloadScript(googleScript));
      } else if (scriptStatus === "loading") {
        // Show loading modal and attach onload listener
        showGooglePopupOnload(googleScript);
      }
    }
  }

  function login(provider: Provider, code: string) {
    loginWithProvider({ variables: { provider, code } });
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        id="google-script"
        src="https://apis.google.com/js/client:platform.js?onload=start"
      />

      <main className="h-screen bg-primary">
        <div className="flex flex-col items-center justify-center h-full space-y-5">
          <div>
            <button
              className="bg-[#DB4437] p-5"
              onClick={() => loginWithGoogle()}
            >
              Login with Google
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
