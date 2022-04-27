import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Terraformation</title>
        <meta name="description" content="Explore your Terraform state" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
