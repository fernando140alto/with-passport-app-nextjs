import React from "react";
import { Provider } from "react-redux";
import { StoreProvider } from "../store/context/context";
import { wrapper } from "../store/redux/store";
// import { increment } from "../store/redux/reducer";
import store from "../store/redux/store";
function MyApp({ Component, pageProps, props }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  // console.log(props);

  return getLayout(
      <StoreProvider initialData={props}>
        <Component {...pageProps} />
      </StoreProvider>
  );
}


export default wrapper.withRedux(MyApp);

// MyApp.getInitialProps = async () => {
//   console.log("inital props being called");
  

//   // fetch some initial data to provide to the store
//   const initialState = await Promise.resolve({
//     counter: {
//       value: 1,
//     },
//   });

//   return {
//     props: initialState,
//   };
// };
