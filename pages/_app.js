/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from "react";
import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { Layout } from "@components";
import Wallet from "../components/wallet/wallet";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Wallet>
          <Component {...pageProps} />
        </Wallet>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
