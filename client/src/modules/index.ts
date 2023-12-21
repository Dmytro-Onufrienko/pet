import auth from "./auth";
import { IModule, IProvider, IRoute } from "./common/interfaces";

const modules: IModule[] = [
  auth,
];
const mergedModules: IModule = {
  routes: modules.reduce((acc: IRoute[], { routes }) => {
    return routes ? [...acc, ...routes] : acc;
  }, []),
  providers: modules.reduce((acc: IProvider[], { providers }) => {
    return providers ? [...acc, ...providers] : acc;
  }, []),
};

export default mergedModules;
