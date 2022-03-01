import React from "react";
import { StoreProvider } from "../store/context/context";

function MyApp({ Component, pageProps, props, ...rest }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  console.log(Component, pageProps, rest);

  return getLayout(
    <StoreProvider initialData={props}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;


MyApp.getInitialProps = () => {
    return {
        props: { hello: "world" }
    }
}
