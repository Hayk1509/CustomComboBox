/// <reference types="vite/client" />

import { FC, ReactNode } from "react";

declare global {
    type FCC<P extends object = object> = FC<{ children: ReactNode } & P>
}