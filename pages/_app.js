import React from "react";
import "../styles/globals.scss";
import { Layout } from "@components";
import Wallet from "../components/wallet/wallet";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Wallet>
        <Component {...pageProps} />
      </Wallet>
    </Layout>
  );
}

export default MyApp;
