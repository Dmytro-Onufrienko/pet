import './App.css'
import AppProvider from './providers'

import modules from './modules';
import { RouteType } from './modules/auth/enums';
import { Route, Routes } from 'react-router-dom';
import NoAuthRoute from './modules/auth/componennts/NoAuthRoute';

const mappedRoutes = {
  [RouteType.Auth]: NoAuthRoute,
  [RouteType.NoAuth]: NoAuthRoute,
  [RouteType.Public]: NoAuthRoute,
};

function App() {
  return (
    <AppProvider>
      <Routes>
        {modules.routes?.map(
          ({ path, Component, type, props }) => {
            const CurrentRoute = mappedRoutes[type];
            return (
              <Route
                key={path}
                path={path}
                element={
                  <CurrentRoute
                    Component={Component}
                    componentProps={props}
                  />
                }
              />
            )
          }
        )}
      </Routes>
    </AppProvider>
  )
}

export default App
