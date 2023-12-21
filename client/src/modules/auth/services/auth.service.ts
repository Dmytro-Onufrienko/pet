import { apolloClient } from "../../../providers/graphql";
import { Query } from "../../../types.d";
import { REFRESH_TOKEN_QUERY } from "../graphql/queries";


class AuthService {
  async getTokens() {
    const response = await apolloClient.mutate<
      Pick<Query, 'refreshToken'>
    >({
      mutation: REFRESH_TOKEN_QUERY,
    });
    return response.data?.refreshToken
  }
}

export const authServices = new AuthService();
