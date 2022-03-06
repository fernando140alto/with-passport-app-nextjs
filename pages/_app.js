import React from "react";
import { Provider } from "react-redux";
import { StoreProvider } from "../store/context/context";
import { useStore } from '../store/redux/store';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const store = useStore(pageProps.initialReduxState);

  return getLayout(
    <Provider store={store}>
      <StoreProvider initialData={pageProps}>
        <Component {...pageProps} />
      </StoreProvider>
    </Provider>
  );
}

export default MyApp;

MyApp.getInitialProps = async () => {
  /* this data is STATIC data and will always
  be reset during navigation */
  const initialReduxState = await Promise.resolve({
    counter: {
      value: 1,
    },
  });

  return { pageProps: { initialReduxState } };
}
