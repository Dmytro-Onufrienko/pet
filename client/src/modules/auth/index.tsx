import { Routes } from '../../config/routes';
import { IModule } from '../common/interfaces';
import { RouteType } from './enums';
import GoogleAuthRedirect from "./pages/GoogleAuthRedirect";
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';

const authModule: IModule = {
  routes: [
    {
      path: Routes.Login,
      Component: LoginPage,
      type: RouteType.NoAuth,
    },
    {
      path: Routes.Home,
      Component: HomePage,
      type: RouteType.NoAuth,
    },
    {
      path: Routes.GoogleAuthRedirect,
      Component: GoogleAuthRedirect,
      type: RouteType.NoAuth,
    },
  ],
};

export default authModule;
