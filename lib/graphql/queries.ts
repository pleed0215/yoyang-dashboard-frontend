import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      data {
        accessToken
        refreshToken
      }
    }
  }
`;

export const MUTATION_LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      success
      message
      data {
        id
        email
        hospitalId
        hospitalRequestId
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    me {
      success
      data {
        id
        email
        username
        hospitalId
        hospitalRequestId
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: Int!) {
    getUserById(id: $id) {
      id
      email
      username
      hospitalId
      hospitalRequestId
    }
  }
`;
