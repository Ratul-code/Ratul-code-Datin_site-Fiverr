import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import store from "../redux/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { useEffect } from "react";

const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(()=>{
  //   console.log("hello")
  // },[])
  return (
    <>
      <Head>
        <title>AVE Dating Site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish&family=Roboto:wght@300;400;500;700;900&family=Rubik&display=swap"
          rel="stylesheet"
        ></link>
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
