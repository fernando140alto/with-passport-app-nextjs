import React from "react";
import { Provider } from "react-redux";
import { StoreProvider } from "../store/context/context";
import { wrapper } from "../store/redux/store";
import { increment } from "../store/redux/reducer";
function MyApp({ Component, pageProps, props }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
      <StoreProvider initialData={props}>
        <Component {...pageProps} />
      </StoreProvider>
  );
}

MyApp.getInitialProps = wrapper.getInitialPageProps(store => ({pathname, req, res}) => {
  store.dispatch(increment());
});

export default wrapper.withRedux(MyApp);


