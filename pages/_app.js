import React from "react";
import { Provider } from "react-redux";
import { StoreProvider } from "../store/context/context";
import store from "../store/redux/store";
function MyApp({ Component, pageProps, props }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <Provider store={store}>
      <StoreProvider initialData={props}>
        <Component {...pageProps} />
      </StoreProvider>
    </Provider>
  );
}

export default MyApp;

MyApp.getInitialProps = () => {
  return {
    props: { hello: "world" },
  };
};
