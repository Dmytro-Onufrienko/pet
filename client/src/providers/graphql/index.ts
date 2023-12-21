import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Operation, fromPromise, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getAccessToken } from '../../utils/getTokens';
import { getMainDefinition } from '@apollo/client/utilities';
import { LOCALE_STORAGE_KEYS } from '../../config/localStorageKeys';
import { authServices } from '../../modules/auth/services/auth.service';

const { ACCESS_TOKEN, REFRESH_TOKEN } = LOCALE_STORAGE_KEYS;

type TokensPair = {
  accessToken: string;
  refreshToken: string;
};

class ApolloClientService {
  isRefreshing = false;

  pendingRequests: any[] = [];

  storageTokensLocally = ({ accessToken, refreshToken }: TokensPair) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  };

  clearLocalTokenStorage() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  async refreshTokensPair(operation: Operation) {
    try {
      this.isRefreshing = true;
      const tokensPair = await authServices.getTokens();
      if (tokensPair) {
        this.storageTokensLocally(tokensPair);
        const oldHeaders = operation.getContext().headers;
        operation.setContext({
          headers: {
            ...oldHeaders,
            Authorization: `Bearer ${tokensPair.accessToken}`,
          },
        });
      }
      return tokensPair;
    } catch (error) {
      this.pendingRequests = [];
      this.clearLocalTokenStorage();
      fromPromise(apolloClient.resetStore());
      return;
    } finally {
      this.isRefreshing = false;
    }
  }

  getErrorLink = () => {
    return onError(({ graphQLErrors, operation, forward  }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ extensions}) => {
          if (extensions.code === "UNAUTHORIZED") {
            let forward$;
              if (!localStorage.getItem(REFRESH_TOKEN)) {
                return forward(operation);
              }

              if (!this.isRefreshing) {
                console.log('refrresh token');
                this.isRefreshing = true;
                forward$ = fromPromise(this.refreshTokensPair(operation));
              } else {
                forward$ = fromPromise(
                  new Promise((resolve) => {
                    this.pendingRequests.push(() => resolve(undefined));
                  })
                );
              }
              return forward$.flatMap(() => {
                return forward(operation);
              });
          }
        });
      }
    });
  }

  getHttpLink() {
    return new HttpLink({
      uri: 'http://localhost:3000/graphql',
      credentials: 'include',
    });
  }

  getAuthLink() {
    return new ApolloLink((operation, forward) => {
      const token = getAccessToken();
    
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      });
    
      return forward(operation);
    });
  }

  getLinks() {
    const errorLink = this.getErrorLink();
    const authLink = this.getAuthLink();
    const httpLink = this.getHttpLink();
    return split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      ApolloLink.from([errorLink, authLink, httpLink])
    );
  }
}

export const apolloClientService = new ApolloClientService();

export const apolloClient = new ApolloClient({
  link: apolloClientService.getLinks(),
  cache: new InMemoryCache(),
});
