import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;

export const RetrieveHospitalListDocument = gql`
    query RetrieveHospitalList($name: String!) {
  retrieveHospitalList(hospitalName: $name) {
    success
    message
    data {
      ykiho
      name
      telno
      located
      addr
      registered
    }
  }
}
    `;

/**
 * __useRetrieveHospitalListQuery__
 *
 * To run a query within a React component, call `useRetrieveHospitalListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveHospitalListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveHospitalListQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRetrieveHospitalListQuery(baseOptions: Apollo.QueryHookOptions<Types.RetrieveHospitalListQuery, Types.RetrieveHospitalListQueryVariables> & ({ variables: Types.RetrieveHospitalListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveHospitalListQuery, Types.RetrieveHospitalListQueryVariables>(RetrieveHospitalListDocument, options);
      }
export function useRetrieveHospitalListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveHospitalListQuery, Types.RetrieveHospitalListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveHospitalListQuery, Types.RetrieveHospitalListQueryVariables>(RetrieveHospitalListDocument, options);
        }
export function useRetrieveHospitalListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveHospitalListQuery, Types.RetrieveHospitalListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveHospitalListQuery, Types.RetrieveHospitalListQueryVariables>(RetrieveHospitalListDocument, options);
        }
export type RetrieveHospitalListQueryHookResult = ReturnType<typeof useRetrieveHospitalListQuery>;
export type RetrieveHospitalListLazyQueryHookResult = ReturnType<typeof useRetrieveHospitalListLazyQuery>;
export type RetrieveHospitalListSuspenseQueryHookResult = ReturnType<typeof useRetrieveHospitalListSuspenseQuery>;
export type RetrieveHospitalListQueryResult = Apollo.QueryResult<Types.RetrieveHospitalListQuery, Types.RetrieveHospitalListQueryVariables>;
export const RequestCreateHospitalDocument = gql`
    mutation RequestCreateHospital($ykiho: String!) {
  requestCreateHospital(ykiho: $ykiho) {
    success
    message
    data {
      id
      ykiho
      state
    }
  }
}
    `;
export type RequestCreateHospitalMutationFn = Apollo.MutationFunction<Types.RequestCreateHospitalMutation, Types.RequestCreateHospitalMutationVariables>;

/**
 * __useRequestCreateHospitalMutation__
 *
 * To run a mutation, you first call `useRequestCreateHospitalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestCreateHospitalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestCreateHospitalMutation, { data, loading, error }] = useRequestCreateHospitalMutation({
 *   variables: {
 *      ykiho: // value for 'ykiho'
 *   },
 * });
 */
export function useRequestCreateHospitalMutation(baseOptions?: Apollo.MutationHookOptions<Types.RequestCreateHospitalMutation, Types.RequestCreateHospitalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RequestCreateHospitalMutation, Types.RequestCreateHospitalMutationVariables>(RequestCreateHospitalDocument, options);
      }
export type RequestCreateHospitalMutationHookResult = ReturnType<typeof useRequestCreateHospitalMutation>;
export type RequestCreateHospitalMutationResult = Apollo.MutationResult<Types.RequestCreateHospitalMutation>;
export type RequestCreateHospitalMutationOptions = Apollo.BaseMutationOptions<Types.RequestCreateHospitalMutation, Types.RequestCreateHospitalMutationVariables>;
export const GetRequestHospitalDocument = gql`
    query GetRequestHospital($ykiho: String!) {
  getRegisterRequest(ykiho: $ykiho) {
    success
    message
    data {
      id
      ykiho
      state
    }
  }
}
    `;

/**
 * __useGetRequestHospitalQuery__
 *
 * To run a query within a React component, call `useGetRequestHospitalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestHospitalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestHospitalQuery({
 *   variables: {
 *      ykiho: // value for 'ykiho'
 *   },
 * });
 */
export function useGetRequestHospitalQuery(baseOptions: Apollo.QueryHookOptions<Types.GetRequestHospitalQuery, Types.GetRequestHospitalQueryVariables> & ({ variables: Types.GetRequestHospitalQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetRequestHospitalQuery, Types.GetRequestHospitalQueryVariables>(GetRequestHospitalDocument, options);
      }
export function useGetRequestHospitalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetRequestHospitalQuery, Types.GetRequestHospitalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetRequestHospitalQuery, Types.GetRequestHospitalQueryVariables>(GetRequestHospitalDocument, options);
        }
export function useGetRequestHospitalSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetRequestHospitalQuery, Types.GetRequestHospitalQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetRequestHospitalQuery, Types.GetRequestHospitalQueryVariables>(GetRequestHospitalDocument, options);
        }
export type GetRequestHospitalQueryHookResult = ReturnType<typeof useGetRequestHospitalQuery>;
export type GetRequestHospitalLazyQueryHookResult = ReturnType<typeof useGetRequestHospitalLazyQuery>;
export type GetRequestHospitalSuspenseQueryHookResult = ReturnType<typeof useGetRequestHospitalSuspenseQuery>;
export type GetRequestHospitalQueryResult = Apollo.QueryResult<Types.GetRequestHospitalQuery, Types.GetRequestHospitalQueryVariables>;
export const GetHospitalInfoDocument = gql`
    query GetHospitalInfo($ykiho: String!) {
  getHospitalInfoByYkiho(ykiho: $ykiho) {
    success
    message
    data {
      ykiho
      name
      addr
      telno
      located
    }
  }
}
    `;

/**
 * __useGetHospitalInfoQuery__
 *
 * To run a query within a React component, call `useGetHospitalInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHospitalInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHospitalInfoQuery({
 *   variables: {
 *      ykiho: // value for 'ykiho'
 *   },
 * });
 */
export function useGetHospitalInfoQuery(baseOptions: Apollo.QueryHookOptions<Types.GetHospitalInfoQuery, Types.GetHospitalInfoQueryVariables> & ({ variables: Types.GetHospitalInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetHospitalInfoQuery, Types.GetHospitalInfoQueryVariables>(GetHospitalInfoDocument, options);
      }
export function useGetHospitalInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetHospitalInfoQuery, Types.GetHospitalInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetHospitalInfoQuery, Types.GetHospitalInfoQueryVariables>(GetHospitalInfoDocument, options);
        }
export function useGetHospitalInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetHospitalInfoQuery, Types.GetHospitalInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetHospitalInfoQuery, Types.GetHospitalInfoQueryVariables>(GetHospitalInfoDocument, options);
        }
export type GetHospitalInfoQueryHookResult = ReturnType<typeof useGetHospitalInfoQuery>;
export type GetHospitalInfoLazyQueryHookResult = ReturnType<typeof useGetHospitalInfoLazyQuery>;
export type GetHospitalInfoSuspenseQueryHookResult = ReturnType<typeof useGetHospitalInfoSuspenseQuery>;
export type GetHospitalInfoQueryResult = Apollo.QueryResult<Types.GetHospitalInfoQuery, Types.GetHospitalInfoQueryVariables>;
export const MeDocument = gql`
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.MeQuery, Types.MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.MeQuery, Types.MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.MeQuery, Types.MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<Types.MeQuery, Types.MeQueryVariables>;
export const GetUserByIdDocument = gql`
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

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables> & ({ variables: Types.GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>;
export const LoginDocument = gql`
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
export type LoginMutationFn = Apollo.MutationFunction<Types.LoginMutation, Types.LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<Types.LoginMutation, Types.LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.LoginMutation, Types.LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<Types.LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<Types.LoginMutation, Types.LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
    message
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<Types.LogoutMutation, Types.LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<Types.LogoutMutation, Types.LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.LogoutMutation, Types.LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<Types.LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<Types.LogoutMutation, Types.LogoutMutationVariables>;
export const SignupDocument = gql`
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
export type SignupMutationFn = Apollo.MutationFunction<Types.SignupMutation, Types.SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<Types.SignupMutation, Types.SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SignupMutation, Types.SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<Types.SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<Types.SignupMutation, Types.SignupMutationVariables>;
export const RetrievePendingUsersDocument = gql`
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

/**
 * __useRetrievePendingUsersQuery__
 *
 * To run a query within a React component, call `useRetrievePendingUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrievePendingUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrievePendingUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useRetrievePendingUsersQuery(baseOptions?: Apollo.QueryHookOptions<Types.RetrievePendingUsersQuery, Types.RetrievePendingUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrievePendingUsersQuery, Types.RetrievePendingUsersQueryVariables>(RetrievePendingUsersDocument, options);
      }
export function useRetrievePendingUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrievePendingUsersQuery, Types.RetrievePendingUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrievePendingUsersQuery, Types.RetrievePendingUsersQueryVariables>(RetrievePendingUsersDocument, options);
        }
export function useRetrievePendingUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrievePendingUsersQuery, Types.RetrievePendingUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrievePendingUsersQuery, Types.RetrievePendingUsersQueryVariables>(RetrievePendingUsersDocument, options);
        }
export type RetrievePendingUsersQueryHookResult = ReturnType<typeof useRetrievePendingUsersQuery>;
export type RetrievePendingUsersLazyQueryHookResult = ReturnType<typeof useRetrievePendingUsersLazyQuery>;
export type RetrievePendingUsersSuspenseQueryHookResult = ReturnType<typeof useRetrievePendingUsersSuspenseQuery>;
export type RetrievePendingUsersQueryResult = Apollo.QueryResult<Types.RetrievePendingUsersQuery, Types.RetrievePendingUsersQueryVariables>;
export const RetrieveUserListDocument = gql`
    query RetrieveUserList($page: Int = 1, $pageSize: Int = 10, $role: UserRole!, $state: CommonState!) {
  superOnlyRetrieveUserList(
    page: $page
    pageSize: $pageSize
    role: $role
    state: $state
  ) {
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

/**
 * __useRetrieveUserListQuery__
 *
 * To run a query within a React component, call `useRetrieveUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveUserListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      role: // value for 'role'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useRetrieveUserListQuery(baseOptions: Apollo.QueryHookOptions<Types.RetrieveUserListQuery, Types.RetrieveUserListQueryVariables> & ({ variables: Types.RetrieveUserListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveUserListQuery, Types.RetrieveUserListQueryVariables>(RetrieveUserListDocument, options);
      }
export function useRetrieveUserListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveUserListQuery, Types.RetrieveUserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveUserListQuery, Types.RetrieveUserListQueryVariables>(RetrieveUserListDocument, options);
        }
export function useRetrieveUserListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveUserListQuery, Types.RetrieveUserListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveUserListQuery, Types.RetrieveUserListQueryVariables>(RetrieveUserListDocument, options);
        }
export type RetrieveUserListQueryHookResult = ReturnType<typeof useRetrieveUserListQuery>;
export type RetrieveUserListLazyQueryHookResult = ReturnType<typeof useRetrieveUserListLazyQuery>;
export type RetrieveUserListSuspenseQueryHookResult = ReturnType<typeof useRetrieveUserListSuspenseQuery>;
export type RetrieveUserListQueryResult = Apollo.QueryResult<Types.RetrieveUserListQuery, Types.RetrieveUserListQueryVariables>;
export const UpdateManyUserStatusDocument = gql`
    mutation UpdateManyUserStatus($input: UpdateManyUserStatusInput!) {
  superOnlyUpdateManyUserStatus(input: $input) {
    success
    message
  }
}
    `;
export type UpdateManyUserStatusMutationFn = Apollo.MutationFunction<Types.UpdateManyUserStatusMutation, Types.UpdateManyUserStatusMutationVariables>;

/**
 * __useUpdateManyUserStatusMutation__
 *
 * To run a mutation, you first call `useUpdateManyUserStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateManyUserStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateManyUserStatusMutation, { data, loading, error }] = useUpdateManyUserStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateManyUserStatusMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateManyUserStatusMutation, Types.UpdateManyUserStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateManyUserStatusMutation, Types.UpdateManyUserStatusMutationVariables>(UpdateManyUserStatusDocument, options);
      }
export type UpdateManyUserStatusMutationHookResult = ReturnType<typeof useUpdateManyUserStatusMutation>;
export type UpdateManyUserStatusMutationResult = Apollo.MutationResult<Types.UpdateManyUserStatusMutation>;
export type UpdateManyUserStatusMutationOptions = Apollo.BaseMutationOptions<Types.UpdateManyUserStatusMutation, Types.UpdateManyUserStatusMutationVariables>;