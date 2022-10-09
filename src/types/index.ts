import { ReactNode } from "react";

import type { NextPage } from "next";

export type ExtendedPage<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};
