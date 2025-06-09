import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me {
      success
      message
      errors {
        message
      }
      data {
        id
        username
        email
        hospitalId
        hospitalRequestId
        role
        state
      }
    }
  }
`;

export const GET_USER_BY_ID_QUERY = gql`
  query GetUserById($id: Int!) {
    getUserById(id: $id) {
      id
      username
      email
      hospitalId
      hospitalRequestId
      role
      state
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      data {
        accessToken
        refreshToken
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      success
      message
      errors {
        message
      }
      data {
        id
        username
        email
      }
    }
  }
`;

export const RETRIEVE_PENDING_USERS_QUERY = gql`
  query RetrievePendingUsers($page: Int = 1, $pageSize: Int = 10) {
    superOnlyRetrievePendingUsers(page: $page, pageSize: $pageSize) {
      success
      message
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        total
        totalPages
      }
      data {
        id
        email
        username
        state
      }
    }
  }
`;

export const RETRIEVE_USER_LIST_QUERY = gql`
  query RetrieveUserList(
    $page: Int = 1
    $pageSize: Int = 10
    $role: UserRole!
    $state: CommonState!
  ) {
    superOnlyRetrieveUserList(page: $page, pageSize: $pageSize, role: $role, state: $state) {
      success
      pageInfo {
        currentPage
        hasPreviousPage
        hasNextPage
        total
        totalPages
      }
      data {
        id
        email
        username
        state
        role
      }
    }
  }
`;

export const UPDATE_MANY_USER_STATUS_MUTATION = gql`
  mutation UpdateManyUserStatus($input: UpdateManyUserStatusInput!) {
    superOnlyUpdateManyUserStatus(input: $input) {
      success
      message
    }
  }
`;
