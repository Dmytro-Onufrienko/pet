import { FC, ReactNode } from "react";
import { IProvider } from "../modules/common/interfaces";
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from "./graphql";

type PropTypes = {
  children: ReactNode;
  providers?: IProvider[];
};

const AppProvider: FC<PropTypes> = ({ children, providers = [] }) => {
  if (!providers.length) {
    return (
      <ApolloProvider client={apolloClient}>
        {children}
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
