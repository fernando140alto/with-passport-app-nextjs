import React from "react";
import { StoreProvider } from "../store/context/context";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;


export async function getServerSideProps(context) {
    return {
        props: { hello: "world" }
    }
}
