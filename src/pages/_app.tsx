import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

import { DefaultLayout } from "@layouts/default-layout";
import { ExtendedPage } from "@types";

import SEO from "../../next-seo.config";

import type { AppProps } from "next/app";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as ExtendedPage).getLayout ||
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DefaultSeo {...SEO} />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
