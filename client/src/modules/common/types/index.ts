import { ComponentType, ReactNode } from "react";

export type ComponentWithChildren<ExtraProps = Record<string, unknown>> =
  ComponentType<
    {
      children: ReactNode;
    } & ExtraProps
  >;
