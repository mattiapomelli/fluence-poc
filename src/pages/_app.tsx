import "../styles/globals.css";
import { DefaultLayout } from "@layouts/default-layout";
import { ExtendedPage } from "@types";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as ExtendedPage).getLayout ||
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return <>{getLayout(<Component {...pageProps} />)}</>;
}

export default MyApp;
