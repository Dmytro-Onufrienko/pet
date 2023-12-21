import { ComponentType } from "react";
import { ComponentWithChildren } from "../types";
import { RouteType } from "../../auth/enums";

export interface IProvider {
  Provider: ComponentWithChildren;
}

export interface IRoute {
  Component: ComponentType<unknown>;
  props?: { [key: string]: unknown };
  type: RouteType;
  path: string;
}

export interface IModule {
  routes?: IRoute[];
  providers?: IProvider[];
}
