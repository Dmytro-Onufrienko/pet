import { gql } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
        id
        username
    }
  }
`;

export const REFRESH_TOKEN_QUERY = gql`
  query RefreshToken {
    refreshToken {
      accessToken
      refreshToken
    }
  }
`;
