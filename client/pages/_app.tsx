import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import store, { wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ave Dating Site</title>
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
// export default wrapper.withRedux(MyApp);
