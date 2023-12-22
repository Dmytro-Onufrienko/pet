import { FC, ReactNode } from "react";
import { IProvider } from "../modules/common/interfaces";
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from "./graphql";
import { GoogleOAuthProvider } from "@react-oauth/google";

type PropTypes = {
  children: ReactNode;
  providers?: IProvider[];
};

const AppProvider: FC<PropTypes> = ({ children, providers = [] }) => {
  if (!providers.length) {
    return (
      <ApolloProvider client={apolloClient}>
        <GoogleOAuthProvider clientId={"903862645929-rfj62e0fd86v53v7nijumldmg9ee6brr.apps.googleusercontent.com"}>
          {children}
        </GoogleOAuthProvider>
      </ApolloProvider>
    );
  }
  const [{ Provider }, ...restProviders] = providers;
  return (
    <AppProvider providers={restProviders}>
      <Provider>{children}</Provider>
    </AppProvider>
  );
}

export default AppProvider;
