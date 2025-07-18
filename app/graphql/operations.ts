import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;

export const CreateEmployeeDocument = gql`
    mutation CreateEmployee($input: EmployeeCreateInput!) {
  createEmployee(input: $input) {
    success
    message
    data {
      id
    }
  }
}
    `;
export type CreateEmployeeMutationFn = Apollo.MutationFunction<Types.CreateEmployeeMutation, Types.CreateEmployeeMutationVariables>;

/**
 * __useCreateEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmployeeMutation, { data, loading, error }] = useCreateEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateEmployeeMutation, Types.CreateEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateEmployeeMutation, Types.CreateEmployeeMutationVariables>(CreateEmployeeDocument, options);
      }
export type CreateEmployeeMutationHookResult = ReturnType<typeof useCreateEmployeeMutation>;
export type CreateEmployeeMutationResult = Apollo.MutationResult<Types.CreateEmployeeMutation>;
export type CreateEmployeeMutationOptions = Apollo.BaseMutationOptions<Types.CreateEmployeeMutation, Types.CreateEmployeeMutationVariables>;
export const GetEmployeeDocument = gql`
    query GetEmployee($employeeId: Int!) {
  getEmployee(employeeId: $employeeId) {
    success
    message
    data {
      id
      name
      createdAt
      updatedAt
      enterDate
      leaveDate
      state
      birthDate
      cellPhone
      position {
        id
        name
      }
      duty {
        id
        name
      }
      ward {
        id
        name
      }
      committees {
        id
        name
      }
      rooms {
        id
        name
      }
      parts {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetEmployeeQuery__
 *
 * To run a query within a React component, call `useGetEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeQuery({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useGetEmployeeQuery(baseOptions: Apollo.QueryHookOptions<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables> & ({ variables: Types.GetEmployeeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables>(GetEmployeeDocument, options);
      }
export function useGetEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables>(GetEmployeeDocument, options);
        }
export function useGetEmployeeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables>(GetEmployeeDocument, options);
        }
export type GetEmployeeQueryHookResult = ReturnType<typeof useGetEmployeeQuery>;
export type GetEmployeeLazyQueryHookResult = ReturnType<typeof useGetEmployeeLazyQuery>;
export type GetEmployeeSuspenseQueryHookResult = ReturnType<typeof useGetEmployeeSuspenseQuery>;
export type GetEmployeeQueryResult = Apollo.QueryResult<Types.GetEmployeeQuery, Types.GetEmployeeQueryVariables>;
export const RetrieveMyHospitalEmployeesDocument = gql`
    query RetrieveMyHospitalEmployees {
  retrieveMyHospitalEmployees {
    success
    message
    data {
      id
      name
      state
      enterDate
      leaveDate
      cellPhone
      birthDate
      state
      position {
        id
        name
      }
      duty {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useRetrieveMyHospitalEmployeesQuery__
 *
 * To run a query within a React component, call `useRetrieveMyHospitalEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveMyHospitalEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveMyHospitalEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRetrieveMyHospitalEmployeesQuery(baseOptions?: Apollo.QueryHookOptions<Types.RetrieveMyHospitalEmployeesQuery, Types.RetrieveMyHospitalEmployeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveMyHospitalEmployeesQuery, Types.RetrieveMyHospitalEmployeesQueryVariables>(RetrieveMyHospitalEmployeesDocument, options);
      }
export function useRetrieveMyHospitalEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveMyHospitalEmployeesQuery, Types.RetrieveMyHospitalEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveMyHospitalEmployeesQuery, Types.RetrieveMyHospitalEmployeesQueryVariables>(RetrieveMyHospitalEmployeesDocument, options);
        }
export function useRetrieveMyHospitalEmployeesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveMyHospitalEmployeesQuery, Types.RetrieveMyHospitalEmployeesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveMyHospitalEmployeesQuery, Types.RetrieveMyHospitalEmployeesQueryVariables>(RetrieveMyHospitalEmployeesDocument, options);
        }
export type RetrieveMyHospitalEmployeesQueryHookResult = ReturnType<typeof useRetrieveMyHospitalEmployeesQuery>;
export type RetrieveMyHospitalEmployeesLazyQueryHookResult = ReturnType<typeof useRetrieveMyHospitalEmployeesLazyQuery>;
export type RetrieveMyHospitalEmployeesSuspenseQueryHookResult = ReturnType<typeof useRetrieveMyHospitalEmployeesSuspenseQuery>;
export type RetrieveMyHospitalEmployeesQueryResult = Apollo.QueryResult<Types.RetrieveMyHospitalEmployeesQuery, Types.RetrieveMyHospitalEmployeesQueryVariables>;
export const UpdateEmployeeDocument = gql`
    mutation UpdateEmployee($employeeId: Int!, $input: EmployeeUpdateInput!) {
  updateEmployee(employeeId: $employeeId, input: $input) {
    success
    message
  }
}
    `;
export type UpdateEmployeeMutationFn = Apollo.MutationFunction<Types.UpdateEmployeeMutation, Types.UpdateEmployeeMutationVariables>;

/**
 * __useUpdateEmployeeMutation__
 *
 * To run a mutation, you first call `useUpdateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmployeeMutation, { data, loading, error }] = useUpdateEmployeeMutation({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateEmployeeMutation, Types.UpdateEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateEmployeeMutation, Types.UpdateEmployeeMutationVariables>(UpdateEmployeeDocument, options);
      }
export type UpdateEmployeeMutationHookResult = ReturnType<typeof useUpdateEmployeeMutation>;
export type UpdateEmployeeMutationResult = Apollo.MutationResult<Types.UpdateEmployeeMutation>;
export type UpdateEmployeeMutationOptions = Apollo.BaseMutationOptions<Types.UpdateEmployeeMutation, Types.UpdateEmployeeMutationVariables>;
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
export const RetrieveCreateHospitalRequestDocument = gql`
    query RetrieveCreateHospitalRequest($page: Int = 1, $pageSize: Int = 10) {
  retrieveCreateHospitalRequest(page: $page, pageSize: $pageSize) {
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
      userId
      ykiho
      state
    }
  }
}
    `;

/**
 * __useRetrieveCreateHospitalRequestQuery__
 *
 * To run a query within a React component, call `useRetrieveCreateHospitalRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveCreateHospitalRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveCreateHospitalRequestQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useRetrieveCreateHospitalRequestQuery(baseOptions?: Apollo.QueryHookOptions<Types.RetrieveCreateHospitalRequestQuery, Types.RetrieveCreateHospitalRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveCreateHospitalRequestQuery, Types.RetrieveCreateHospitalRequestQueryVariables>(RetrieveCreateHospitalRequestDocument, options);
      }
export function useRetrieveCreateHospitalRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveCreateHospitalRequestQuery, Types.RetrieveCreateHospitalRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveCreateHospitalRequestQuery, Types.RetrieveCreateHospitalRequestQueryVariables>(RetrieveCreateHospitalRequestDocument, options);
        }
export function useRetrieveCreateHospitalRequestSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveCreateHospitalRequestQuery, Types.RetrieveCreateHospitalRequestQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveCreateHospitalRequestQuery, Types.RetrieveCreateHospitalRequestQueryVariables>(RetrieveCreateHospitalRequestDocument, options);
        }
export type RetrieveCreateHospitalRequestQueryHookResult = ReturnType<typeof useRetrieveCreateHospitalRequestQuery>;
export type RetrieveCreateHospitalRequestLazyQueryHookResult = ReturnType<typeof useRetrieveCreateHospitalRequestLazyQuery>;
export type RetrieveCreateHospitalRequestSuspenseQueryHookResult = ReturnType<typeof useRetrieveCreateHospitalRequestSuspenseQuery>;
export type RetrieveCreateHospitalRequestQueryResult = Apollo.QueryResult<Types.RetrieveCreateHospitalRequestQuery, Types.RetrieveCreateHospitalRequestQueryVariables>;
export const AcceptCreateHospitalRequestDocument = gql`
    mutation AcceptCreateHospitalRequest($requestId: Int!) {
  acceptCreateHospitalRequest(requestId: $requestId) {
    success
    message
  }
}
    `;
export type AcceptCreateHospitalRequestMutationFn = Apollo.MutationFunction<Types.AcceptCreateHospitalRequestMutation, Types.AcceptCreateHospitalRequestMutationVariables>;

/**
 * __useAcceptCreateHospitalRequestMutation__
 *
 * To run a mutation, you first call `useAcceptCreateHospitalRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptCreateHospitalRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptCreateHospitalRequestMutation, { data, loading, error }] = useAcceptCreateHospitalRequestMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useAcceptCreateHospitalRequestMutation(baseOptions?: Apollo.MutationHookOptions<Types.AcceptCreateHospitalRequestMutation, Types.AcceptCreateHospitalRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AcceptCreateHospitalRequestMutation, Types.AcceptCreateHospitalRequestMutationVariables>(AcceptCreateHospitalRequestDocument, options);
      }
export type AcceptCreateHospitalRequestMutationHookResult = ReturnType<typeof useAcceptCreateHospitalRequestMutation>;
export type AcceptCreateHospitalRequestMutationResult = Apollo.MutationResult<Types.AcceptCreateHospitalRequestMutation>;
export type AcceptCreateHospitalRequestMutationOptions = Apollo.BaseMutationOptions<Types.AcceptCreateHospitalRequestMutation, Types.AcceptCreateHospitalRequestMutationVariables>;
export const DenyCreateHospitalRequestDocument = gql`
    mutation DenyCreateHospitalRequest($requestId: Int!) {
  denyCreateHospitalRequest(requestId: $requestId) {
    success
    message
  }
}
    `;
export type DenyCreateHospitalRequestMutationFn = Apollo.MutationFunction<Types.DenyCreateHospitalRequestMutation, Types.DenyCreateHospitalRequestMutationVariables>;

/**
 * __useDenyCreateHospitalRequestMutation__
 *
 * To run a mutation, you first call `useDenyCreateHospitalRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDenyCreateHospitalRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [denyCreateHospitalRequestMutation, { data, loading, error }] = useDenyCreateHospitalRequestMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useDenyCreateHospitalRequestMutation(baseOptions?: Apollo.MutationHookOptions<Types.DenyCreateHospitalRequestMutation, Types.DenyCreateHospitalRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DenyCreateHospitalRequestMutation, Types.DenyCreateHospitalRequestMutationVariables>(DenyCreateHospitalRequestDocument, options);
      }
export type DenyCreateHospitalRequestMutationHookResult = ReturnType<typeof useDenyCreateHospitalRequestMutation>;
export type DenyCreateHospitalRequestMutationResult = Apollo.MutationResult<Types.DenyCreateHospitalRequestMutation>;
export type DenyCreateHospitalRequestMutationOptions = Apollo.BaseMutationOptions<Types.DenyCreateHospitalRequestMutation, Types.DenyCreateHospitalRequestMutationVariables>;
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
export const RetrieveJoinRequestDocument = gql`
    query RetrieveJoinRequest($page: Int = 1, $pageSize: Int = 10) {
  adminOnlyRetrieveJoinRequest(page: $page, pageSize: $pageSize) {
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
      message
      user {
        id
        username
        email
      }
    }
  }
}
    `;

/**
 * __useRetrieveJoinRequestQuery__
 *
 * To run a query within a React component, call `useRetrieveJoinRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveJoinRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveJoinRequestQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useRetrieveJoinRequestQuery(baseOptions?: Apollo.QueryHookOptions<Types.RetrieveJoinRequestQuery, Types.RetrieveJoinRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveJoinRequestQuery, Types.RetrieveJoinRequestQueryVariables>(RetrieveJoinRequestDocument, options);
      }
export function useRetrieveJoinRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveJoinRequestQuery, Types.RetrieveJoinRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveJoinRequestQuery, Types.RetrieveJoinRequestQueryVariables>(RetrieveJoinRequestDocument, options);
        }
export function useRetrieveJoinRequestSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveJoinRequestQuery, Types.RetrieveJoinRequestQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveJoinRequestQuery, Types.RetrieveJoinRequestQueryVariables>(RetrieveJoinRequestDocument, options);
        }
export type RetrieveJoinRequestQueryHookResult = ReturnType<typeof useRetrieveJoinRequestQuery>;
export type RetrieveJoinRequestLazyQueryHookResult = ReturnType<typeof useRetrieveJoinRequestLazyQuery>;
export type RetrieveJoinRequestSuspenseQueryHookResult = ReturnType<typeof useRetrieveJoinRequestSuspenseQuery>;
export type RetrieveJoinRequestQueryResult = Apollo.QueryResult<Types.RetrieveJoinRequestQuery, Types.RetrieveJoinRequestQueryVariables>;
export const AcceptJoinRequestDocument = gql`
    mutation AcceptJoinRequest($requestId: Int!) {
  acceptJoinRequest(requestId: $requestId) {
    success
    message
  }
}
    `;
export type AcceptJoinRequestMutationFn = Apollo.MutationFunction<Types.AcceptJoinRequestMutation, Types.AcceptJoinRequestMutationVariables>;

/**
 * __useAcceptJoinRequestMutation__
 *
 * To run a mutation, you first call `useAcceptJoinRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptJoinRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptJoinRequestMutation, { data, loading, error }] = useAcceptJoinRequestMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useAcceptJoinRequestMutation(baseOptions?: Apollo.MutationHookOptions<Types.AcceptJoinRequestMutation, Types.AcceptJoinRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AcceptJoinRequestMutation, Types.AcceptJoinRequestMutationVariables>(AcceptJoinRequestDocument, options);
      }
export type AcceptJoinRequestMutationHookResult = ReturnType<typeof useAcceptJoinRequestMutation>;
export type AcceptJoinRequestMutationResult = Apollo.MutationResult<Types.AcceptJoinRequestMutation>;
export type AcceptJoinRequestMutationOptions = Apollo.BaseMutationOptions<Types.AcceptJoinRequestMutation, Types.AcceptJoinRequestMutationVariables>;
export const DenyJoinRequestDocument = gql`
    mutation DenyJoinRequest($requestId: Int!) {
  denyJoinRequest(requestId: $requestId) {
    success
    message
  }
}
    `;
export type DenyJoinRequestMutationFn = Apollo.MutationFunction<Types.DenyJoinRequestMutation, Types.DenyJoinRequestMutationVariables>;

/**
 * __useDenyJoinRequestMutation__
 *
 * To run a mutation, you first call `useDenyJoinRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDenyJoinRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [denyJoinRequestMutation, { data, loading, error }] = useDenyJoinRequestMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useDenyJoinRequestMutation(baseOptions?: Apollo.MutationHookOptions<Types.DenyJoinRequestMutation, Types.DenyJoinRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DenyJoinRequestMutation, Types.DenyJoinRequestMutationVariables>(DenyJoinRequestDocument, options);
      }
export type DenyJoinRequestMutationHookResult = ReturnType<typeof useDenyJoinRequestMutation>;
export type DenyJoinRequestMutationResult = Apollo.MutationResult<Types.DenyJoinRequestMutation>;
export type DenyJoinRequestMutationOptions = Apollo.BaseMutationOptions<Types.DenyJoinRequestMutation, Types.DenyJoinRequestMutationVariables>;
export const GetHospitalByYkihoDocument = gql`
    query GetHospitalByYkiho($ykiho: String!) {
  getHospitalByYkiho(ykiho: $ykiho) {
    success
    message
    data {
      id
      name
      located
    }
  }
}
    `;

/**
 * __useGetHospitalByYkihoQuery__
 *
 * To run a query within a React component, call `useGetHospitalByYkihoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHospitalByYkihoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHospitalByYkihoQuery({
 *   variables: {
 *      ykiho: // value for 'ykiho'
 *   },
 * });
 */
export function useGetHospitalByYkihoQuery(baseOptions: Apollo.QueryHookOptions<Types.GetHospitalByYkihoQuery, Types.GetHospitalByYkihoQueryVariables> & ({ variables: Types.GetHospitalByYkihoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetHospitalByYkihoQuery, Types.GetHospitalByYkihoQueryVariables>(GetHospitalByYkihoDocument, options);
      }
export function useGetHospitalByYkihoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetHospitalByYkihoQuery, Types.GetHospitalByYkihoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetHospitalByYkihoQuery, Types.GetHospitalByYkihoQueryVariables>(GetHospitalByYkihoDocument, options);
        }
export function useGetHospitalByYkihoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetHospitalByYkihoQuery, Types.GetHospitalByYkihoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetHospitalByYkihoQuery, Types.GetHospitalByYkihoQueryVariables>(GetHospitalByYkihoDocument, options);
        }
export type GetHospitalByYkihoQueryHookResult = ReturnType<typeof useGetHospitalByYkihoQuery>;
export type GetHospitalByYkihoLazyQueryHookResult = ReturnType<typeof useGetHospitalByYkihoLazyQuery>;
export type GetHospitalByYkihoSuspenseQueryHookResult = ReturnType<typeof useGetHospitalByYkihoSuspenseQuery>;
export type GetHospitalByYkihoQueryResult = Apollo.QueryResult<Types.GetHospitalByYkihoQuery, Types.GetHospitalByYkihoQueryVariables>;
export const RequestJoinHospitalDocument = gql`
    mutation RequestJoinHospital($hospitalId: Int!, $message: String!) {
  requestJoinHospital(hospitalId: $hospitalId, message: $message) {
    success
    message
    data {
      id
      state
    }
  }
}
    `;
export type RequestJoinHospitalMutationFn = Apollo.MutationFunction<Types.RequestJoinHospitalMutation, Types.RequestJoinHospitalMutationVariables>;

/**
 * __useRequestJoinHospitalMutation__
 *
 * To run a mutation, you first call `useRequestJoinHospitalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestJoinHospitalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestJoinHospitalMutation, { data, loading, error }] = useRequestJoinHospitalMutation({
 *   variables: {
 *      hospitalId: // value for 'hospitalId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useRequestJoinHospitalMutation(baseOptions?: Apollo.MutationHookOptions<Types.RequestJoinHospitalMutation, Types.RequestJoinHospitalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RequestJoinHospitalMutation, Types.RequestJoinHospitalMutationVariables>(RequestJoinHospitalDocument, options);
      }
export type RequestJoinHospitalMutationHookResult = ReturnType<typeof useRequestJoinHospitalMutation>;
export type RequestJoinHospitalMutationResult = Apollo.MutationResult<Types.RequestJoinHospitalMutation>;
export type RequestJoinHospitalMutationOptions = Apollo.BaseMutationOptions<Types.RequestJoinHospitalMutation, Types.RequestJoinHospitalMutationVariables>;
export const GetJoinRequestByCurrentUserDocument = gql`
    query GetJoinRequestByCurrentUser {
  getJoinRequestByCurrentUser {
    success
    message
    data {
      id
      state
      hospital {
        name
        located
        state
      }
    }
  }
}
    `;

/**
 * __useGetJoinRequestByCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetJoinRequestByCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJoinRequestByCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJoinRequestByCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetJoinRequestByCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetJoinRequestByCurrentUserQuery, Types.GetJoinRequestByCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetJoinRequestByCurrentUserQuery, Types.GetJoinRequestByCurrentUserQueryVariables>(GetJoinRequestByCurrentUserDocument, options);
      }
export function useGetJoinRequestByCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetJoinRequestByCurrentUserQuery, Types.GetJoinRequestByCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetJoinRequestByCurrentUserQuery, Types.GetJoinRequestByCurrentUserQueryVariables>(GetJoinRequestByCurrentUserDocument, options);
        }
export function useGetJoinRequestByCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetJoinRequestByCurrentUserQuery, Types.GetJoinRequestByCurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetJoinRequestByCurrentUserQuery, Types.GetJoinRequestByCurrentUserQueryVariables>(GetJoinRequestByCurrentUserDocument, options);
        }
export type GetJoinRequestByCurrentUserQueryHookResult = ReturnType<typeof useGetJoinRequestByCurrentUserQuery>;
export type GetJoinRequestByCurrentUserLazyQueryHookResult = ReturnType<typeof useGetJoinRequestByCurrentUserLazyQuery>;
export type GetJoinRequestByCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetJoinRequestByCurrentUserSuspenseQuery>;
export type GetJoinRequestByCurrentUserQueryResult = Apollo.QueryResult<Types.GetJoinRequestByCurrentUserQuery, Types.GetJoinRequestByCurrentUserQueryVariables>;
export const DeleteJoinRequestForCurrentUserDocument = gql`
    mutation DeleteJoinRequestForCurrentUser {
  deleteJoinRequestForCurrentUser {
    success
    message
  }
}
    `;
export type DeleteJoinRequestForCurrentUserMutationFn = Apollo.MutationFunction<Types.DeleteJoinRequestForCurrentUserMutation, Types.DeleteJoinRequestForCurrentUserMutationVariables>;

/**
 * __useDeleteJoinRequestForCurrentUserMutation__
 *
 * To run a mutation, you first call `useDeleteJoinRequestForCurrentUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJoinRequestForCurrentUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteJoinRequestForCurrentUserMutation, { data, loading, error }] = useDeleteJoinRequestForCurrentUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteJoinRequestForCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteJoinRequestForCurrentUserMutation, Types.DeleteJoinRequestForCurrentUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteJoinRequestForCurrentUserMutation, Types.DeleteJoinRequestForCurrentUserMutationVariables>(DeleteJoinRequestForCurrentUserDocument, options);
      }
export type DeleteJoinRequestForCurrentUserMutationHookResult = ReturnType<typeof useDeleteJoinRequestForCurrentUserMutation>;
export type DeleteJoinRequestForCurrentUserMutationResult = Apollo.MutationResult<Types.DeleteJoinRequestForCurrentUserMutation>;
export type DeleteJoinRequestForCurrentUserMutationOptions = Apollo.BaseMutationOptions<Types.DeleteJoinRequestForCurrentUserMutation, Types.DeleteJoinRequestForCurrentUserMutationVariables>;
export const RetrieveHospitalUsersDocument = gql`
    query RetrieveHospitalUsers($page: Int = 1, $pageSize: Int = 10, $role: UserRole) {
  retrieveHospitalUsersForAdmin(page: $page, pageSize: $pageSize, role: $role) {
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
      username
      email
      role
      state
    }
  }
}
    `;

/**
 * __useRetrieveHospitalUsersQuery__
 *
 * To run a query within a React component, call `useRetrieveHospitalUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveHospitalUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveHospitalUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useRetrieveHospitalUsersQuery(baseOptions?: Apollo.QueryHookOptions<Types.RetrieveHospitalUsersQuery, Types.RetrieveHospitalUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveHospitalUsersQuery, Types.RetrieveHospitalUsersQueryVariables>(RetrieveHospitalUsersDocument, options);
      }
export function useRetrieveHospitalUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveHospitalUsersQuery, Types.RetrieveHospitalUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveHospitalUsersQuery, Types.RetrieveHospitalUsersQueryVariables>(RetrieveHospitalUsersDocument, options);
        }
export function useRetrieveHospitalUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveHospitalUsersQuery, Types.RetrieveHospitalUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveHospitalUsersQuery, Types.RetrieveHospitalUsersQueryVariables>(RetrieveHospitalUsersDocument, options);
        }
export type RetrieveHospitalUsersQueryHookResult = ReturnType<typeof useRetrieveHospitalUsersQuery>;
export type RetrieveHospitalUsersLazyQueryHookResult = ReturnType<typeof useRetrieveHospitalUsersLazyQuery>;
export type RetrieveHospitalUsersSuspenseQueryHookResult = ReturnType<typeof useRetrieveHospitalUsersSuspenseQuery>;
export type RetrieveHospitalUsersQueryResult = Apollo.QueryResult<Types.RetrieveHospitalUsersQuery, Types.RetrieveHospitalUsersQueryVariables>;
export const UpdateManyUserStatusForAdminDocument = gql`
    mutation UpdateManyUserStatusForAdmin($input: UpdateManyUserStatusInput!) {
  updateManyUserStatusForAdmin(input: $input) {
    success
    message
  }
}
    `;
export type UpdateManyUserStatusForAdminMutationFn = Apollo.MutationFunction<Types.UpdateManyUserStatusForAdminMutation, Types.UpdateManyUserStatusForAdminMutationVariables>;

/**
 * __useUpdateManyUserStatusForAdminMutation__
 *
 * To run a mutation, you first call `useUpdateManyUserStatusForAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateManyUserStatusForAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateManyUserStatusForAdminMutation, { data, loading, error }] = useUpdateManyUserStatusForAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateManyUserStatusForAdminMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateManyUserStatusForAdminMutation, Types.UpdateManyUserStatusForAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateManyUserStatusForAdminMutation, Types.UpdateManyUserStatusForAdminMutationVariables>(UpdateManyUserStatusForAdminDocument, options);
      }
export type UpdateManyUserStatusForAdminMutationHookResult = ReturnType<typeof useUpdateManyUserStatusForAdminMutation>;
export type UpdateManyUserStatusForAdminMutationResult = Apollo.MutationResult<Types.UpdateManyUserStatusForAdminMutation>;
export type UpdateManyUserStatusForAdminMutationOptions = Apollo.BaseMutationOptions<Types.UpdateManyUserStatusForAdminMutation, Types.UpdateManyUserStatusForAdminMutationVariables>;
export const UnlinkManyUserFromHospitalForAdminDocument = gql`
    mutation UnlinkManyUserFromHospitalForAdmin($input: ManyUserIdInput!) {
  unlinkManyUserForAdmin(input: $input) {
    success
    message
  }
}
    `;
export type UnlinkManyUserFromHospitalForAdminMutationFn = Apollo.MutationFunction<Types.UnlinkManyUserFromHospitalForAdminMutation, Types.UnlinkManyUserFromHospitalForAdminMutationVariables>;

/**
 * __useUnlinkManyUserFromHospitalForAdminMutation__
 *
 * To run a mutation, you first call `useUnlinkManyUserFromHospitalForAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlinkManyUserFromHospitalForAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlinkManyUserFromHospitalForAdminMutation, { data, loading, error }] = useUnlinkManyUserFromHospitalForAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnlinkManyUserFromHospitalForAdminMutation(baseOptions?: Apollo.MutationHookOptions<Types.UnlinkManyUserFromHospitalForAdminMutation, Types.UnlinkManyUserFromHospitalForAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UnlinkManyUserFromHospitalForAdminMutation, Types.UnlinkManyUserFromHospitalForAdminMutationVariables>(UnlinkManyUserFromHospitalForAdminDocument, options);
      }
export type UnlinkManyUserFromHospitalForAdminMutationHookResult = ReturnType<typeof useUnlinkManyUserFromHospitalForAdminMutation>;
export type UnlinkManyUserFromHospitalForAdminMutationResult = Apollo.MutationResult<Types.UnlinkManyUserFromHospitalForAdminMutation>;
export type UnlinkManyUserFromHospitalForAdminMutationOptions = Apollo.BaseMutationOptions<Types.UnlinkManyUserFromHospitalForAdminMutation, Types.UnlinkManyUserFromHospitalForAdminMutationVariables>;
export const UnlinkUserFromHospitalForAdminDocument = gql`
    mutation UnlinkUserFromHospitalForAdmin($input: UserIdInput!) {
  unlinkUserForAdmin(input: $input) {
    success
    message
  }
}
    `;
export type UnlinkUserFromHospitalForAdminMutationFn = Apollo.MutationFunction<Types.UnlinkUserFromHospitalForAdminMutation, Types.UnlinkUserFromHospitalForAdminMutationVariables>;

/**
 * __useUnlinkUserFromHospitalForAdminMutation__
 *
 * To run a mutation, you first call `useUnlinkUserFromHospitalForAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlinkUserFromHospitalForAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlinkUserFromHospitalForAdminMutation, { data, loading, error }] = useUnlinkUserFromHospitalForAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnlinkUserFromHospitalForAdminMutation(baseOptions?: Apollo.MutationHookOptions<Types.UnlinkUserFromHospitalForAdminMutation, Types.UnlinkUserFromHospitalForAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UnlinkUserFromHospitalForAdminMutation, Types.UnlinkUserFromHospitalForAdminMutationVariables>(UnlinkUserFromHospitalForAdminDocument, options);
      }
export type UnlinkUserFromHospitalForAdminMutationHookResult = ReturnType<typeof useUnlinkUserFromHospitalForAdminMutation>;
export type UnlinkUserFromHospitalForAdminMutationResult = Apollo.MutationResult<Types.UnlinkUserFromHospitalForAdminMutation>;
export type UnlinkUserFromHospitalForAdminMutationOptions = Apollo.BaseMutationOptions<Types.UnlinkUserFromHospitalForAdminMutation, Types.UnlinkUserFromHospitalForAdminMutationVariables>;
export const RetrieveMyHospitalDutiesDocument = gql`
    query RetrieveMyHospitalDuties {
  retrieveMyHospitalDuties {
    success
    message
    data {
      id
      name
    }
  }
}
    `;

/**
 * __useRetrieveMyHospitalDutiesQuery__
 *
 * To run a query within a React component, call `useRetrieveMyHospitalDutiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveMyHospitalDutiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveMyHospitalDutiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRetrieveMyHospitalDutiesQuery(baseOptions?: Apollo.QueryHookOptions<Types.RetrieveMyHospitalDutiesQuery, Types.RetrieveMyHospitalDutiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveMyHospitalDutiesQuery, Types.RetrieveMyHospitalDutiesQueryVariables>(RetrieveMyHospitalDutiesDocument, options);
      }
export function useRetrieveMyHospitalDutiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveMyHospitalDutiesQuery, Types.RetrieveMyHospitalDutiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveMyHospitalDutiesQuery, Types.RetrieveMyHospitalDutiesQueryVariables>(RetrieveMyHospitalDutiesDocument, options);
        }
export function useRetrieveMyHospitalDutiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveMyHospitalDutiesQuery, Types.RetrieveMyHospitalDutiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveMyHospitalDutiesQuery, Types.RetrieveMyHospitalDutiesQueryVariables>(RetrieveMyHospitalDutiesDocument, options);
        }
export type RetrieveMyHospitalDutiesQueryHookResult = ReturnType<typeof useRetrieveMyHospitalDutiesQuery>;
export type RetrieveMyHospitalDutiesLazyQueryHookResult = ReturnType<typeof useRetrieveMyHospitalDutiesLazyQuery>;
export type RetrieveMyHospitalDutiesSuspenseQueryHookResult = ReturnType<typeof useRetrieveMyHospitalDutiesSuspenseQuery>;
export type RetrieveMyHospitalDutiesQueryResult = Apollo.QueryResult<Types.RetrieveMyHospitalDutiesQuery, Types.RetrieveMyHospitalDutiesQueryVariables>;
export const RetrieveMyHospitalPositionsDocument = gql`
    query RetrieveMyHospitalPositions {
  retrieveMyHospitalPositions {
    success
    message
    data {
      id
      name
    }
  }
}
    `;

/**
 * __useRetrieveMyHospitalPositionsQuery__
 *
 * To run a query within a React component, call `useRetrieveMyHospitalPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveMyHospitalPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveMyHospitalPositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRetrieveMyHospitalPositionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.RetrieveMyHospitalPositionsQuery, Types.RetrieveMyHospitalPositionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveMyHospitalPositionsQuery, Types.RetrieveMyHospitalPositionsQueryVariables>(RetrieveMyHospitalPositionsDocument, options);
      }
export function useRetrieveMyHospitalPositionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveMyHospitalPositionsQuery, Types.RetrieveMyHospitalPositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveMyHospitalPositionsQuery, Types.RetrieveMyHospitalPositionsQueryVariables>(RetrieveMyHospitalPositionsDocument, options);
        }
export function useRetrieveMyHospitalPositionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveMyHospitalPositionsQuery, Types.RetrieveMyHospitalPositionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveMyHospitalPositionsQuery, Types.RetrieveMyHospitalPositionsQueryVariables>(RetrieveMyHospitalPositionsDocument, options);
        }
export type RetrieveMyHospitalPositionsQueryHookResult = ReturnType<typeof useRetrieveMyHospitalPositionsQuery>;
export type RetrieveMyHospitalPositionsLazyQueryHookResult = ReturnType<typeof useRetrieveMyHospitalPositionsLazyQuery>;
export type RetrieveMyHospitalPositionsSuspenseQueryHookResult = ReturnType<typeof useRetrieveMyHospitalPositionsSuspenseQuery>;
export type RetrieveMyHospitalPositionsQueryResult = Apollo.QueryResult<Types.RetrieveMyHospitalPositionsQuery, Types.RetrieveMyHospitalPositionsQueryVariables>;
export const CreateMyHospitalPositionDocument = gql`
    mutation CreateMyHospitalPosition($name: String!) {
  createMyHospitalPosition(name: $name) {
    success
    message
  }
}
    `;
export type CreateMyHospitalPositionMutationFn = Apollo.MutationFunction<Types.CreateMyHospitalPositionMutation, Types.CreateMyHospitalPositionMutationVariables>;

/**
 * __useCreateMyHospitalPositionMutation__
 *
 * To run a mutation, you first call `useCreateMyHospitalPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMyHospitalPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMyHospitalPositionMutation, { data, loading, error }] = useCreateMyHospitalPositionMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateMyHospitalPositionMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateMyHospitalPositionMutation, Types.CreateMyHospitalPositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateMyHospitalPositionMutation, Types.CreateMyHospitalPositionMutationVariables>(CreateMyHospitalPositionDocument, options);
      }
export type CreateMyHospitalPositionMutationHookResult = ReturnType<typeof useCreateMyHospitalPositionMutation>;
export type CreateMyHospitalPositionMutationResult = Apollo.MutationResult<Types.CreateMyHospitalPositionMutation>;
export type CreateMyHospitalPositionMutationOptions = Apollo.BaseMutationOptions<Types.CreateMyHospitalPositionMutation, Types.CreateMyHospitalPositionMutationVariables>;
export const UpdateHospitalPositionDocument = gql`
    mutation UpdateHospitalPosition($positionId: Int!, $name: String!) {
  updateHospitalPosition(positionId: $positionId, name: $name) {
    success
    message
  }
}
    `;
export type UpdateHospitalPositionMutationFn = Apollo.MutationFunction<Types.UpdateHospitalPositionMutation, Types.UpdateHospitalPositionMutationVariables>;

/**
 * __useUpdateHospitalPositionMutation__
 *
 * To run a mutation, you first call `useUpdateHospitalPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHospitalPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHospitalPositionMutation, { data, loading, error }] = useUpdateHospitalPositionMutation({
 *   variables: {
 *      positionId: // value for 'positionId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateHospitalPositionMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateHospitalPositionMutation, Types.UpdateHospitalPositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateHospitalPositionMutation, Types.UpdateHospitalPositionMutationVariables>(UpdateHospitalPositionDocument, options);
      }
export type UpdateHospitalPositionMutationHookResult = ReturnType<typeof useUpdateHospitalPositionMutation>;
export type UpdateHospitalPositionMutationResult = Apollo.MutationResult<Types.UpdateHospitalPositionMutation>;
export type UpdateHospitalPositionMutationOptions = Apollo.BaseMutationOptions<Types.UpdateHospitalPositionMutation, Types.UpdateHospitalPositionMutationVariables>;
export const DeleteHospitalPositionDocument = gql`
    mutation DeleteHospitalPosition($positionId: Int!) {
  deleteHospitalPosition(positionId: $positionId) {
    success
    message
  }
}
    `;
export type DeleteHospitalPositionMutationFn = Apollo.MutationFunction<Types.DeleteHospitalPositionMutation, Types.DeleteHospitalPositionMutationVariables>;

/**
 * __useDeleteHospitalPositionMutation__
 *
 * To run a mutation, you first call `useDeleteHospitalPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHospitalPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHospitalPositionMutation, { data, loading, error }] = useDeleteHospitalPositionMutation({
 *   variables: {
 *      positionId: // value for 'positionId'
 *   },
 * });
 */
export function useDeleteHospitalPositionMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteHospitalPositionMutation, Types.DeleteHospitalPositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteHospitalPositionMutation, Types.DeleteHospitalPositionMutationVariables>(DeleteHospitalPositionDocument, options);
      }
export type DeleteHospitalPositionMutationHookResult = ReturnType<typeof useDeleteHospitalPositionMutation>;
export type DeleteHospitalPositionMutationResult = Apollo.MutationResult<Types.DeleteHospitalPositionMutation>;
export type DeleteHospitalPositionMutationOptions = Apollo.BaseMutationOptions<Types.DeleteHospitalPositionMutation, Types.DeleteHospitalPositionMutationVariables>;
export const RetrieveMyHospitalPartsDocument = gql`
    query RetrieveMyHospitalParts {
  retrieveMyHospitalParts {
    success
    message
    data {
      id
      name
    }
  }
}
    `;

/**
 * __useRetrieveMyHospitalPartsQuery__
 *
 * To run a query within a React component, call `useRetrieveMyHospitalPartsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveMyHospitalPartsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveMyHospitalPartsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRetrieveMyHospitalPartsQuery(baseOptions?: Apollo.QueryHookOptions<Types.RetrieveMyHospitalPartsQuery, Types.RetrieveMyHospitalPartsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveMyHospitalPartsQuery, Types.RetrieveMyHospitalPartsQueryVariables>(RetrieveMyHospitalPartsDocument, options);
      }
export function useRetrieveMyHospitalPartsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveMyHospitalPartsQuery, Types.RetrieveMyHospitalPartsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveMyHospitalPartsQuery, Types.RetrieveMyHospitalPartsQueryVariables>(RetrieveMyHospitalPartsDocument, options);
        }
export function useRetrieveMyHospitalPartsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveMyHospitalPartsQuery, Types.RetrieveMyHospitalPartsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveMyHospitalPartsQuery, Types.RetrieveMyHospitalPartsQueryVariables>(RetrieveMyHospitalPartsDocument, options);
        }
export type RetrieveMyHospitalPartsQueryHookResult = ReturnType<typeof useRetrieveMyHospitalPartsQuery>;
export type RetrieveMyHospitalPartsLazyQueryHookResult = ReturnType<typeof useRetrieveMyHospitalPartsLazyQuery>;
export type RetrieveMyHospitalPartsSuspenseQueryHookResult = ReturnType<typeof useRetrieveMyHospitalPartsSuspenseQuery>;
export type RetrieveMyHospitalPartsQueryResult = Apollo.QueryResult<Types.RetrieveMyHospitalPartsQuery, Types.RetrieveMyHospitalPartsQueryVariables>;
export const RetrieveMyHospitalWardsDocument = gql`
    query RetrieveMyHospitalWards {
  retrieveMyHospitalWards {
    success
    message
    data {
      id
      name
    }
  }
}
    `;

/**
 * __useRetrieveMyHospitalWardsQuery__
 *
 * To run a query within a React component, call `useRetrieveMyHospitalWardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveMyHospitalWardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveMyHospitalWardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRetrieveMyHospitalWardsQuery(baseOptions?: Apollo.QueryHookOptions<Types.RetrieveMyHospitalWardsQuery, Types.RetrieveMyHospitalWardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveMyHospitalWardsQuery, Types.RetrieveMyHospitalWardsQueryVariables>(RetrieveMyHospitalWardsDocument, options);
      }
export function useRetrieveMyHospitalWardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveMyHospitalWardsQuery, Types.RetrieveMyHospitalWardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveMyHospitalWardsQuery, Types.RetrieveMyHospitalWardsQueryVariables>(RetrieveMyHospitalWardsDocument, options);
        }
export function useRetrieveMyHospitalWardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveMyHospitalWardsQuery, Types.RetrieveMyHospitalWardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveMyHospitalWardsQuery, Types.RetrieveMyHospitalWardsQueryVariables>(RetrieveMyHospitalWardsDocument, options);
        }
export type RetrieveMyHospitalWardsQueryHookResult = ReturnType<typeof useRetrieveMyHospitalWardsQuery>;
export type RetrieveMyHospitalWardsLazyQueryHookResult = ReturnType<typeof useRetrieveMyHospitalWardsLazyQuery>;
export type RetrieveMyHospitalWardsSuspenseQueryHookResult = ReturnType<typeof useRetrieveMyHospitalWardsSuspenseQuery>;
export type RetrieveMyHospitalWardsQueryResult = Apollo.QueryResult<Types.RetrieveMyHospitalWardsQuery, Types.RetrieveMyHospitalWardsQueryVariables>;
export const RetrieveMyHospitalCommitteesDocument = gql`
    query RetrieveMyHospitalCommittees {
  retrieveMyHospitalCommittees {
    success
    message
    data {
      id
      name
    }
  }
}
    `;

/**
 * __useRetrieveMyHospitalCommitteesQuery__
 *
 * To run a query within a React component, call `useRetrieveMyHospitalCommitteesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveMyHospitalCommitteesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveMyHospitalCommitteesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRetrieveMyHospitalCommitteesQuery(baseOptions?: Apollo.QueryHookOptions<Types.RetrieveMyHospitalCommitteesQuery, Types.RetrieveMyHospitalCommitteesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveMyHospitalCommitteesQuery, Types.RetrieveMyHospitalCommitteesQueryVariables>(RetrieveMyHospitalCommitteesDocument, options);
      }
export function useRetrieveMyHospitalCommitteesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveMyHospitalCommitteesQuery, Types.RetrieveMyHospitalCommitteesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveMyHospitalCommitteesQuery, Types.RetrieveMyHospitalCommitteesQueryVariables>(RetrieveMyHospitalCommitteesDocument, options);
        }
export function useRetrieveMyHospitalCommitteesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveMyHospitalCommitteesQuery, Types.RetrieveMyHospitalCommitteesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveMyHospitalCommitteesQuery, Types.RetrieveMyHospitalCommitteesQueryVariables>(RetrieveMyHospitalCommitteesDocument, options);
        }
export type RetrieveMyHospitalCommitteesQueryHookResult = ReturnType<typeof useRetrieveMyHospitalCommitteesQuery>;
export type RetrieveMyHospitalCommitteesLazyQueryHookResult = ReturnType<typeof useRetrieveMyHospitalCommitteesLazyQuery>;
export type RetrieveMyHospitalCommitteesSuspenseQueryHookResult = ReturnType<typeof useRetrieveMyHospitalCommitteesSuspenseQuery>;
export type RetrieveMyHospitalCommitteesQueryResult = Apollo.QueryResult<Types.RetrieveMyHospitalCommitteesQuery, Types.RetrieveMyHospitalCommitteesQueryVariables>;
export const CreateMyHospitalPartDocument = gql`
    mutation CreateMyHospitalPart($name: String!) {
  createMyHospitalPart(name: $name) {
    success
    message
    data {
      id
      name
    }
  }
}
    `;
export type CreateMyHospitalPartMutationFn = Apollo.MutationFunction<Types.CreateMyHospitalPartMutation, Types.CreateMyHospitalPartMutationVariables>;

/**
 * __useCreateMyHospitalPartMutation__
 *
 * To run a mutation, you first call `useCreateMyHospitalPartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMyHospitalPartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMyHospitalPartMutation, { data, loading, error }] = useCreateMyHospitalPartMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateMyHospitalPartMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateMyHospitalPartMutation, Types.CreateMyHospitalPartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateMyHospitalPartMutation, Types.CreateMyHospitalPartMutationVariables>(CreateMyHospitalPartDocument, options);
      }
export type CreateMyHospitalPartMutationHookResult = ReturnType<typeof useCreateMyHospitalPartMutation>;
export type CreateMyHospitalPartMutationResult = Apollo.MutationResult<Types.CreateMyHospitalPartMutation>;
export type CreateMyHospitalPartMutationOptions = Apollo.BaseMutationOptions<Types.CreateMyHospitalPartMutation, Types.CreateMyHospitalPartMutationVariables>;
export const UpdateHospitalPartDocument = gql`
    mutation UpdateHospitalPart($partId: Int!, $name: String!) {
  updateHospitalPart(partId: $partId, name: $name) {
    success
    message
    data {
      id
      name
    }
  }
}
    `;
export type UpdateHospitalPartMutationFn = Apollo.MutationFunction<Types.UpdateHospitalPartMutation, Types.UpdateHospitalPartMutationVariables>;

/**
 * __useUpdateHospitalPartMutation__
 *
 * To run a mutation, you first call `useUpdateHospitalPartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHospitalPartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHospitalPartMutation, { data, loading, error }] = useUpdateHospitalPartMutation({
 *   variables: {
 *      partId: // value for 'partId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateHospitalPartMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateHospitalPartMutation, Types.UpdateHospitalPartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateHospitalPartMutation, Types.UpdateHospitalPartMutationVariables>(UpdateHospitalPartDocument, options);
      }
export type UpdateHospitalPartMutationHookResult = ReturnType<typeof useUpdateHospitalPartMutation>;
export type UpdateHospitalPartMutationResult = Apollo.MutationResult<Types.UpdateHospitalPartMutation>;
export type UpdateHospitalPartMutationOptions = Apollo.BaseMutationOptions<Types.UpdateHospitalPartMutation, Types.UpdateHospitalPartMutationVariables>;
export const DeleteHospitalPartDocument = gql`
    mutation DeleteHospitalPart($partId: Int!) {
  deleteHospitalPart(partId: $partId) {
    success
    message
  }
}
    `;
export type DeleteHospitalPartMutationFn = Apollo.MutationFunction<Types.DeleteHospitalPartMutation, Types.DeleteHospitalPartMutationVariables>;

/**
 * __useDeleteHospitalPartMutation__
 *
 * To run a mutation, you first call `useDeleteHospitalPartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHospitalPartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHospitalPartMutation, { data, loading, error }] = useDeleteHospitalPartMutation({
 *   variables: {
 *      partId: // value for 'partId'
 *   },
 * });
 */
export function useDeleteHospitalPartMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteHospitalPartMutation, Types.DeleteHospitalPartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteHospitalPartMutation, Types.DeleteHospitalPartMutationVariables>(DeleteHospitalPartDocument, options);
      }
export type DeleteHospitalPartMutationHookResult = ReturnType<typeof useDeleteHospitalPartMutation>;
export type DeleteHospitalPartMutationResult = Apollo.MutationResult<Types.DeleteHospitalPartMutation>;
export type DeleteHospitalPartMutationOptions = Apollo.BaseMutationOptions<Types.DeleteHospitalPartMutation, Types.DeleteHospitalPartMutationVariables>;
export const CreateMyHospitalWardDocument = gql`
    mutation CreateMyHospitalWard($name: String!) {
  createMyHospitalWard(name: $name) {
    success
    message
  }
}
    `;
export type CreateMyHospitalWardMutationFn = Apollo.MutationFunction<Types.CreateMyHospitalWardMutation, Types.CreateMyHospitalWardMutationVariables>;

/**
 * __useCreateMyHospitalWardMutation__
 *
 * To run a mutation, you first call `useCreateMyHospitalWardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMyHospitalWardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMyHospitalWardMutation, { data, loading, error }] = useCreateMyHospitalWardMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateMyHospitalWardMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateMyHospitalWardMutation, Types.CreateMyHospitalWardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateMyHospitalWardMutation, Types.CreateMyHospitalWardMutationVariables>(CreateMyHospitalWardDocument, options);
      }
export type CreateMyHospitalWardMutationHookResult = ReturnType<typeof useCreateMyHospitalWardMutation>;
export type CreateMyHospitalWardMutationResult = Apollo.MutationResult<Types.CreateMyHospitalWardMutation>;
export type CreateMyHospitalWardMutationOptions = Apollo.BaseMutationOptions<Types.CreateMyHospitalWardMutation, Types.CreateMyHospitalWardMutationVariables>;
export const UpdateHospitalWardDocument = gql`
    mutation UpdateHospitalWard($wardId: Int!, $name: String!) {
  updateHospitalWard(wardId: $wardId, name: $name) {
    success
    message
  }
}
    `;
export type UpdateHospitalWardMutationFn = Apollo.MutationFunction<Types.UpdateHospitalWardMutation, Types.UpdateHospitalWardMutationVariables>;

/**
 * __useUpdateHospitalWardMutation__
 *
 * To run a mutation, you first call `useUpdateHospitalWardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHospitalWardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHospitalWardMutation, { data, loading, error }] = useUpdateHospitalWardMutation({
 *   variables: {
 *      wardId: // value for 'wardId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateHospitalWardMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateHospitalWardMutation, Types.UpdateHospitalWardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateHospitalWardMutation, Types.UpdateHospitalWardMutationVariables>(UpdateHospitalWardDocument, options);
      }
export type UpdateHospitalWardMutationHookResult = ReturnType<typeof useUpdateHospitalWardMutation>;
export type UpdateHospitalWardMutationResult = Apollo.MutationResult<Types.UpdateHospitalWardMutation>;
export type UpdateHospitalWardMutationOptions = Apollo.BaseMutationOptions<Types.UpdateHospitalWardMutation, Types.UpdateHospitalWardMutationVariables>;
export const DeleteHospitalWardDocument = gql`
    mutation DeleteHospitalWard($wardId: Int!) {
  deleteHospitalWard(wardId: $wardId) {
    success
    message
  }
}
    `;
export type DeleteHospitalWardMutationFn = Apollo.MutationFunction<Types.DeleteHospitalWardMutation, Types.DeleteHospitalWardMutationVariables>;

/**
 * __useDeleteHospitalWardMutation__
 *
 * To run a mutation, you first call `useDeleteHospitalWardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHospitalWardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHospitalWardMutation, { data, loading, error }] = useDeleteHospitalWardMutation({
 *   variables: {
 *      wardId: // value for 'wardId'
 *   },
 * });
 */
export function useDeleteHospitalWardMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteHospitalWardMutation, Types.DeleteHospitalWardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteHospitalWardMutation, Types.DeleteHospitalWardMutationVariables>(DeleteHospitalWardDocument, options);
      }
export type DeleteHospitalWardMutationHookResult = ReturnType<typeof useDeleteHospitalWardMutation>;
export type DeleteHospitalWardMutationResult = Apollo.MutationResult<Types.DeleteHospitalWardMutation>;
export type DeleteHospitalWardMutationOptions = Apollo.BaseMutationOptions<Types.DeleteHospitalWardMutation, Types.DeleteHospitalWardMutationVariables>;
export const CreateMyHospitalCommitteeDocument = gql`
    mutation CreateMyHospitalCommittee($name: String!) {
  createMyHospitalCommittee(name: $name) {
    success
    message
  }
}
    `;
export type CreateMyHospitalCommitteeMutationFn = Apollo.MutationFunction<Types.CreateMyHospitalCommitteeMutation, Types.CreateMyHospitalCommitteeMutationVariables>;

/**
 * __useCreateMyHospitalCommitteeMutation__
 *
 * To run a mutation, you first call `useCreateMyHospitalCommitteeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMyHospitalCommitteeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMyHospitalCommitteeMutation, { data, loading, error }] = useCreateMyHospitalCommitteeMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateMyHospitalCommitteeMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateMyHospitalCommitteeMutation, Types.CreateMyHospitalCommitteeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateMyHospitalCommitteeMutation, Types.CreateMyHospitalCommitteeMutationVariables>(CreateMyHospitalCommitteeDocument, options);
      }
export type CreateMyHospitalCommitteeMutationHookResult = ReturnType<typeof useCreateMyHospitalCommitteeMutation>;
export type CreateMyHospitalCommitteeMutationResult = Apollo.MutationResult<Types.CreateMyHospitalCommitteeMutation>;
export type CreateMyHospitalCommitteeMutationOptions = Apollo.BaseMutationOptions<Types.CreateMyHospitalCommitteeMutation, Types.CreateMyHospitalCommitteeMutationVariables>;
export const UpdateHospitalCommitteeDocument = gql`
    mutation UpdateHospitalCommittee($committeeId: Int!, $name: String!) {
  updateHospitalCommittee(committeeId: $committeeId, name: $name) {
    success
    message
  }
}
    `;
export type UpdateHospitalCommitteeMutationFn = Apollo.MutationFunction<Types.UpdateHospitalCommitteeMutation, Types.UpdateHospitalCommitteeMutationVariables>;

/**
 * __useUpdateHospitalCommitteeMutation__
 *
 * To run a mutation, you first call `useUpdateHospitalCommitteeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHospitalCommitteeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHospitalCommitteeMutation, { data, loading, error }] = useUpdateHospitalCommitteeMutation({
 *   variables: {
 *      committeeId: // value for 'committeeId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateHospitalCommitteeMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateHospitalCommitteeMutation, Types.UpdateHospitalCommitteeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateHospitalCommitteeMutation, Types.UpdateHospitalCommitteeMutationVariables>(UpdateHospitalCommitteeDocument, options);
      }
export type UpdateHospitalCommitteeMutationHookResult = ReturnType<typeof useUpdateHospitalCommitteeMutation>;
export type UpdateHospitalCommitteeMutationResult = Apollo.MutationResult<Types.UpdateHospitalCommitteeMutation>;
export type UpdateHospitalCommitteeMutationOptions = Apollo.BaseMutationOptions<Types.UpdateHospitalCommitteeMutation, Types.UpdateHospitalCommitteeMutationVariables>;
export const DeleteHospitalCommitteeDocument = gql`
    mutation DeleteHospitalCommittee($committeeId: Int!) {
  deleteHospitalCommittee(committeeId: $committeeId) {
    success
    message
  }
}
    `;
export type DeleteHospitalCommitteeMutationFn = Apollo.MutationFunction<Types.DeleteHospitalCommitteeMutation, Types.DeleteHospitalCommitteeMutationVariables>;

/**
 * __useDeleteHospitalCommitteeMutation__
 *
 * To run a mutation, you first call `useDeleteHospitalCommitteeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHospitalCommitteeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHospitalCommitteeMutation, { data, loading, error }] = useDeleteHospitalCommitteeMutation({
 *   variables: {
 *      committeeId: // value for 'committeeId'
 *   },
 * });
 */
export function useDeleteHospitalCommitteeMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteHospitalCommitteeMutation, Types.DeleteHospitalCommitteeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteHospitalCommitteeMutation, Types.DeleteHospitalCommitteeMutationVariables>(DeleteHospitalCommitteeDocument, options);
      }
export type DeleteHospitalCommitteeMutationHookResult = ReturnType<typeof useDeleteHospitalCommitteeMutation>;
export type DeleteHospitalCommitteeMutationResult = Apollo.MutationResult<Types.DeleteHospitalCommitteeMutation>;
export type DeleteHospitalCommitteeMutationOptions = Apollo.BaseMutationOptions<Types.DeleteHospitalCommitteeMutation, Types.DeleteHospitalCommitteeMutationVariables>;
export const RetrievePatientListDocument = gql`
    query RetrievePatientList($page: Int = 1, $pageSize: Int = 50, $hospitalId: Int!, $startDate: DateTime, $endDate: DateTime, $wardId: Int, $roomId: Int) {
  retrievePatientList(
    page: $page
    pageSize: $pageSize
    hospitalId: $hospitalId
    startDate: $startDate
    endDate: $endDate
    wardId: $wardId
    roomId: $roomId
  ) {
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
      name
      chartId
      gender
      roomId
      wardId
      enterDate
      leaveDate
    }
  }
}
    `;

/**
 * __useRetrievePatientListQuery__
 *
 * To run a query within a React component, call `useRetrievePatientListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrievePatientListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrievePatientListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      hospitalId: // value for 'hospitalId'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      wardId: // value for 'wardId'
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useRetrievePatientListQuery(baseOptions: Apollo.QueryHookOptions<Types.RetrievePatientListQuery, Types.RetrievePatientListQueryVariables> & ({ variables: Types.RetrievePatientListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrievePatientListQuery, Types.RetrievePatientListQueryVariables>(RetrievePatientListDocument, options);
      }
export function useRetrievePatientListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrievePatientListQuery, Types.RetrievePatientListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrievePatientListQuery, Types.RetrievePatientListQueryVariables>(RetrievePatientListDocument, options);
        }
export function useRetrievePatientListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrievePatientListQuery, Types.RetrievePatientListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrievePatientListQuery, Types.RetrievePatientListQueryVariables>(RetrievePatientListDocument, options);
        }
export type RetrievePatientListQueryHookResult = ReturnType<typeof useRetrievePatientListQuery>;
export type RetrievePatientListLazyQueryHookResult = ReturnType<typeof useRetrievePatientListLazyQuery>;
export type RetrievePatientListSuspenseQueryHookResult = ReturnType<typeof useRetrievePatientListSuspenseQuery>;
export type RetrievePatientListQueryResult = Apollo.QueryResult<Types.RetrievePatientListQuery, Types.RetrievePatientListQueryVariables>;
export const RetrievePatientsOnThatDateDocument = gql`
    query RetrievePatientsOnThatDate($date: DateTime!, $hospitalId: Int!, $wardId: Int, $roomId: Int, $page: Int, $pageSize: Int) {
  retrievePatientsOnThatDate(
    date: $date
    hospitalId: $hospitalId
    wardId: $wardId
    roomId: $roomId
    page: $page
    pageSize: $pageSize
  ) {
    success
    message
    data {
      id
      name
      chartId
      birthDate
      gender
      roomId
      wardId
      enterDate
      leaveDate
    }
  }
}
    `;

/**
 * __useRetrievePatientsOnThatDateQuery__
 *
 * To run a query within a React component, call `useRetrievePatientsOnThatDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrievePatientsOnThatDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrievePatientsOnThatDateQuery({
 *   variables: {
 *      date: // value for 'date'
 *      hospitalId: // value for 'hospitalId'
 *      wardId: // value for 'wardId'
 *      roomId: // value for 'roomId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useRetrievePatientsOnThatDateQuery(baseOptions: Apollo.QueryHookOptions<Types.RetrievePatientsOnThatDateQuery, Types.RetrievePatientsOnThatDateQueryVariables> & ({ variables: Types.RetrievePatientsOnThatDateQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrievePatientsOnThatDateQuery, Types.RetrievePatientsOnThatDateQueryVariables>(RetrievePatientsOnThatDateDocument, options);
      }
export function useRetrievePatientsOnThatDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrievePatientsOnThatDateQuery, Types.RetrievePatientsOnThatDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrievePatientsOnThatDateQuery, Types.RetrievePatientsOnThatDateQueryVariables>(RetrievePatientsOnThatDateDocument, options);
        }
export function useRetrievePatientsOnThatDateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrievePatientsOnThatDateQuery, Types.RetrievePatientsOnThatDateQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrievePatientsOnThatDateQuery, Types.RetrievePatientsOnThatDateQueryVariables>(RetrievePatientsOnThatDateDocument, options);
        }
export type RetrievePatientsOnThatDateQueryHookResult = ReturnType<typeof useRetrievePatientsOnThatDateQuery>;
export type RetrievePatientsOnThatDateLazyQueryHookResult = ReturnType<typeof useRetrievePatientsOnThatDateLazyQuery>;
export type RetrievePatientsOnThatDateSuspenseQueryHookResult = ReturnType<typeof useRetrievePatientsOnThatDateSuspenseQuery>;
export type RetrievePatientsOnThatDateQueryResult = Apollo.QueryResult<Types.RetrievePatientsOnThatDateQuery, Types.RetrievePatientsOnThatDateQueryVariables>;
export const GetHospitalPatientCountOnDateDocument = gql`
    query GetHospitalPatientCountOnDate($date: DateTime!, $hospitalId: Int!) {
  getHospitalPatientCountOnDate(date: $date, hospitalId: $hospitalId) {
    success
    message
    data {
      totalCount
      date
      hospitalId
      ward {
        wardId
        totalCount
        wardInfo {
          name
        }
        room {
          totalCount
          roomId
          roomInfo {
            name
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetHospitalPatientCountOnDateQuery__
 *
 * To run a query within a React component, call `useGetHospitalPatientCountOnDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHospitalPatientCountOnDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHospitalPatientCountOnDateQuery({
 *   variables: {
 *      date: // value for 'date'
 *      hospitalId: // value for 'hospitalId'
 *   },
 * });
 */
export function useGetHospitalPatientCountOnDateQuery(baseOptions: Apollo.QueryHookOptions<Types.GetHospitalPatientCountOnDateQuery, Types.GetHospitalPatientCountOnDateQueryVariables> & ({ variables: Types.GetHospitalPatientCountOnDateQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetHospitalPatientCountOnDateQuery, Types.GetHospitalPatientCountOnDateQueryVariables>(GetHospitalPatientCountOnDateDocument, options);
      }
export function useGetHospitalPatientCountOnDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetHospitalPatientCountOnDateQuery, Types.GetHospitalPatientCountOnDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetHospitalPatientCountOnDateQuery, Types.GetHospitalPatientCountOnDateQueryVariables>(GetHospitalPatientCountOnDateDocument, options);
        }
export function useGetHospitalPatientCountOnDateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetHospitalPatientCountOnDateQuery, Types.GetHospitalPatientCountOnDateQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetHospitalPatientCountOnDateQuery, Types.GetHospitalPatientCountOnDateQueryVariables>(GetHospitalPatientCountOnDateDocument, options);
        }
export type GetHospitalPatientCountOnDateQueryHookResult = ReturnType<typeof useGetHospitalPatientCountOnDateQuery>;
export type GetHospitalPatientCountOnDateLazyQueryHookResult = ReturnType<typeof useGetHospitalPatientCountOnDateLazyQuery>;
export type GetHospitalPatientCountOnDateSuspenseQueryHookResult = ReturnType<typeof useGetHospitalPatientCountOnDateSuspenseQuery>;
export type GetHospitalPatientCountOnDateQueryResult = Apollo.QueryResult<Types.GetHospitalPatientCountOnDateQuery, Types.GetHospitalPatientCountOnDateQueryVariables>;
export const RetrieveWardPatientListDocument = gql`
    query RetrieveWardPatientList($wardId: Int!, $page: Int = 1, $pageSize: Int = 10, $hospitalId: Int!, $startDate: DateTime, $endDate: DateTime) {
  retrievePatientList(
    wardId: $wardId
    page: $page
    pageSize: $pageSize
    hospitalId: $hospitalId
    startDate: $startDate
    endDate: $endDate
  ) {
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
      name
      gender
      roomId
      chartId
      wardId
      enterDate
      leaveDate
    }
  }
}
    `;

/**
 * __useRetrieveWardPatientListQuery__
 *
 * To run a query within a React component, call `useRetrieveWardPatientListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveWardPatientListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveWardPatientListQuery({
 *   variables: {
 *      wardId: // value for 'wardId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      hospitalId: // value for 'hospitalId'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useRetrieveWardPatientListQuery(baseOptions: Apollo.QueryHookOptions<Types.RetrieveWardPatientListQuery, Types.RetrieveWardPatientListQueryVariables> & ({ variables: Types.RetrieveWardPatientListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveWardPatientListQuery, Types.RetrieveWardPatientListQueryVariables>(RetrieveWardPatientListDocument, options);
      }
export function useRetrieveWardPatientListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveWardPatientListQuery, Types.RetrieveWardPatientListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveWardPatientListQuery, Types.RetrieveWardPatientListQueryVariables>(RetrieveWardPatientListDocument, options);
        }
export function useRetrieveWardPatientListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveWardPatientListQuery, Types.RetrieveWardPatientListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveWardPatientListQuery, Types.RetrieveWardPatientListQueryVariables>(RetrieveWardPatientListDocument, options);
        }
export type RetrieveWardPatientListQueryHookResult = ReturnType<typeof useRetrieveWardPatientListQuery>;
export type RetrieveWardPatientListLazyQueryHookResult = ReturnType<typeof useRetrieveWardPatientListLazyQuery>;
export type RetrieveWardPatientListSuspenseQueryHookResult = ReturnType<typeof useRetrieveWardPatientListSuspenseQuery>;
export type RetrieveWardPatientListQueryResult = Apollo.QueryResult<Types.RetrieveWardPatientListQuery, Types.RetrieveWardPatientListQueryVariables>;
export const RetrieveRoomPatientListDocument = gql`
    query RetrieveRoomPatientList($roomId: Int!, $page: Int = 1, $pageSize: Int = 10, $hospitalId: Int!, $startDate: DateTime, $endDate: DateTime) {
  retrievePatientList(
    roomId: $roomId
    page: $page
    pageSize: $pageSize
    hospitalId: $hospitalId
    startDate: $startDate
    endDate: $endDate
  ) {
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
      name
      gender
      chartId
      roomId
      wardId
      enterDate
      leaveDate
    }
  }
}
    `;

/**
 * __useRetrieveRoomPatientListQuery__
 *
 * To run a query within a React component, call `useRetrieveRoomPatientListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveRoomPatientListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveRoomPatientListQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      hospitalId: // value for 'hospitalId'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useRetrieveRoomPatientListQuery(baseOptions: Apollo.QueryHookOptions<Types.RetrieveRoomPatientListQuery, Types.RetrieveRoomPatientListQueryVariables> & ({ variables: Types.RetrieveRoomPatientListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveRoomPatientListQuery, Types.RetrieveRoomPatientListQueryVariables>(RetrieveRoomPatientListDocument, options);
      }
export function useRetrieveRoomPatientListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveRoomPatientListQuery, Types.RetrieveRoomPatientListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveRoomPatientListQuery, Types.RetrieveRoomPatientListQueryVariables>(RetrieveRoomPatientListDocument, options);
        }
export function useRetrieveRoomPatientListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveRoomPatientListQuery, Types.RetrieveRoomPatientListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveRoomPatientListQuery, Types.RetrieveRoomPatientListQueryVariables>(RetrieveRoomPatientListDocument, options);
        }
export type RetrieveRoomPatientListQueryHookResult = ReturnType<typeof useRetrieveRoomPatientListQuery>;
export type RetrieveRoomPatientListLazyQueryHookResult = ReturnType<typeof useRetrieveRoomPatientListLazyQuery>;
export type RetrieveRoomPatientListSuspenseQueryHookResult = ReturnType<typeof useRetrieveRoomPatientListSuspenseQuery>;
export type RetrieveRoomPatientListQueryResult = Apollo.QueryResult<Types.RetrieveRoomPatientListQuery, Types.RetrieveRoomPatientListQueryVariables>;
export const CreatePatientDocument = gql`
    mutation CreatePatient($input: CreatePatientInput!) {
  createPatient(input: $input) {
    success
    message
  }
}
    `;
export type CreatePatientMutationFn = Apollo.MutationFunction<Types.CreatePatientMutation, Types.CreatePatientMutationVariables>;

/**
 * __useCreatePatientMutation__
 *
 * To run a mutation, you first call `useCreatePatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPatientMutation, { data, loading, error }] = useCreatePatientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePatientMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreatePatientMutation, Types.CreatePatientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreatePatientMutation, Types.CreatePatientMutationVariables>(CreatePatientDocument, options);
      }
export type CreatePatientMutationHookResult = ReturnType<typeof useCreatePatientMutation>;
export type CreatePatientMutationResult = Apollo.MutationResult<Types.CreatePatientMutation>;
export type CreatePatientMutationOptions = Apollo.BaseMutationOptions<Types.CreatePatientMutation, Types.CreatePatientMutationVariables>;
export const BulkCreatePatientsFromFileDocument = gql`
    mutation BulkCreatePatientsFromFile($input: BulkCreatePatientsFromFileInput!) {
  bulkCreatePatientsFromFile(input: $input) {
    success
    message
  }
}
    `;
export type BulkCreatePatientsFromFileMutationFn = Apollo.MutationFunction<Types.BulkCreatePatientsFromFileMutation, Types.BulkCreatePatientsFromFileMutationVariables>;

/**
 * __useBulkCreatePatientsFromFileMutation__
 *
 * To run a mutation, you first call `useBulkCreatePatientsFromFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkCreatePatientsFromFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkCreatePatientsFromFileMutation, { data, loading, error }] = useBulkCreatePatientsFromFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkCreatePatientsFromFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.BulkCreatePatientsFromFileMutation, Types.BulkCreatePatientsFromFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.BulkCreatePatientsFromFileMutation, Types.BulkCreatePatientsFromFileMutationVariables>(BulkCreatePatientsFromFileDocument, options);
      }
export type BulkCreatePatientsFromFileMutationHookResult = ReturnType<typeof useBulkCreatePatientsFromFileMutation>;
export type BulkCreatePatientsFromFileMutationResult = Apollo.MutationResult<Types.BulkCreatePatientsFromFileMutation>;
export type BulkCreatePatientsFromFileMutationOptions = Apollo.BaseMutationOptions<Types.BulkCreatePatientsFromFileMutation, Types.BulkCreatePatientsFromFileMutationVariables>;
export const BulkCreatePatientsDocument = gql`
    mutation BulkCreatePatients($inputs: [CreatePatientInput!]!) {
  bulkCreatePatients(inputs: $inputs) {
    success
    message
  }
}
    `;
export type BulkCreatePatientsMutationFn = Apollo.MutationFunction<Types.BulkCreatePatientsMutation, Types.BulkCreatePatientsMutationVariables>;

/**
 * __useBulkCreatePatientsMutation__
 *
 * To run a mutation, you first call `useBulkCreatePatientsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkCreatePatientsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkCreatePatientsMutation, { data, loading, error }] = useBulkCreatePatientsMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useBulkCreatePatientsMutation(baseOptions?: Apollo.MutationHookOptions<Types.BulkCreatePatientsMutation, Types.BulkCreatePatientsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.BulkCreatePatientsMutation, Types.BulkCreatePatientsMutationVariables>(BulkCreatePatientsDocument, options);
      }
export type BulkCreatePatientsMutationHookResult = ReturnType<typeof useBulkCreatePatientsMutation>;
export type BulkCreatePatientsMutationResult = Apollo.MutationResult<Types.BulkCreatePatientsMutation>;
export type BulkCreatePatientsMutationOptions = Apollo.BaseMutationOptions<Types.BulkCreatePatientsMutation, Types.BulkCreatePatientsMutationVariables>;
export const UpdatePatientDocument = gql`
    mutation UpdatePatient($patientId: Int!, $input: UpdatePatientInput!) {
  updatePatient(patientId: $patientId, input: $input) {
    success
    message
  }
}
    `;
export type UpdatePatientMutationFn = Apollo.MutationFunction<Types.UpdatePatientMutation, Types.UpdatePatientMutationVariables>;

/**
 * __useUpdatePatientMutation__
 *
 * To run a mutation, you first call `useUpdatePatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePatientMutation, { data, loading, error }] = useUpdatePatientMutation({
 *   variables: {
 *      patientId: // value for 'patientId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePatientMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdatePatientMutation, Types.UpdatePatientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdatePatientMutation, Types.UpdatePatientMutationVariables>(UpdatePatientDocument, options);
      }
export type UpdatePatientMutationHookResult = ReturnType<typeof useUpdatePatientMutation>;
export type UpdatePatientMutationResult = Apollo.MutationResult<Types.UpdatePatientMutation>;
export type UpdatePatientMutationOptions = Apollo.BaseMutationOptions<Types.UpdatePatientMutation, Types.UpdatePatientMutationVariables>;
export const DeletePatientDocument = gql`
    mutation DeletePatient($patientId: Int!) {
  deletePatient(patientId: $patientId) {
    success
    message
  }
}
    `;
export type DeletePatientMutationFn = Apollo.MutationFunction<Types.DeletePatientMutation, Types.DeletePatientMutationVariables>;

/**
 * __useDeletePatientMutation__
 *
 * To run a mutation, you first call `useDeletePatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePatientMutation, { data, loading, error }] = useDeletePatientMutation({
 *   variables: {
 *      patientId: // value for 'patientId'
 *   },
 * });
 */
export function useDeletePatientMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeletePatientMutation, Types.DeletePatientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeletePatientMutation, Types.DeletePatientMutationVariables>(DeletePatientDocument, options);
      }
export type DeletePatientMutationHookResult = ReturnType<typeof useDeletePatientMutation>;
export type DeletePatientMutationResult = Apollo.MutationResult<Types.DeletePatientMutation>;
export type DeletePatientMutationOptions = Apollo.BaseMutationOptions<Types.DeletePatientMutation, Types.DeletePatientMutationVariables>;
export const GetPatientDocument = gql`
    query GetPatient($patientId: Int!) {
  getPatient(patientId: $patientId) {
    success
    message
    data {
      id
      name
      gender
      roomId
      wardId
      enterDate
      leaveDate
    }
  }
}
    `;

/**
 * __useGetPatientQuery__
 *
 * To run a query within a React component, call `useGetPatientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPatientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPatientQuery({
 *   variables: {
 *      patientId: // value for 'patientId'
 *   },
 * });
 */
export function useGetPatientQuery(baseOptions: Apollo.QueryHookOptions<Types.GetPatientQuery, Types.GetPatientQueryVariables> & ({ variables: Types.GetPatientQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetPatientQuery, Types.GetPatientQueryVariables>(GetPatientDocument, options);
      }
export function useGetPatientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetPatientQuery, Types.GetPatientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetPatientQuery, Types.GetPatientQueryVariables>(GetPatientDocument, options);
        }
export function useGetPatientSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetPatientQuery, Types.GetPatientQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetPatientQuery, Types.GetPatientQueryVariables>(GetPatientDocument, options);
        }
export type GetPatientQueryHookResult = ReturnType<typeof useGetPatientQuery>;
export type GetPatientLazyQueryHookResult = ReturnType<typeof useGetPatientLazyQuery>;
export type GetPatientSuspenseQueryHookResult = ReturnType<typeof useGetPatientSuspenseQuery>;
export type GetPatientQueryResult = Apollo.QueryResult<Types.GetPatientQuery, Types.GetPatientQueryVariables>;
export const RetrieveMyHospitalWardsAndRoomsDocument = gql`
    query RetrieveMyHospitalWardsAndRooms {
  retrieveMyHospitalWards {
    success
    message
    data {
      id
      name
      rooms {
        id
        name
        size
      }
    }
  }
}
    `;

/**
 * __useRetrieveMyHospitalWardsAndRoomsQuery__
 *
 * To run a query within a React component, call `useRetrieveMyHospitalWardsAndRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveMyHospitalWardsAndRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveMyHospitalWardsAndRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRetrieveMyHospitalWardsAndRoomsQuery(baseOptions?: Apollo.QueryHookOptions<Types.RetrieveMyHospitalWardsAndRoomsQuery, Types.RetrieveMyHospitalWardsAndRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RetrieveMyHospitalWardsAndRoomsQuery, Types.RetrieveMyHospitalWardsAndRoomsQueryVariables>(RetrieveMyHospitalWardsAndRoomsDocument, options);
      }
export function useRetrieveMyHospitalWardsAndRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RetrieveMyHospitalWardsAndRoomsQuery, Types.RetrieveMyHospitalWardsAndRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RetrieveMyHospitalWardsAndRoomsQuery, Types.RetrieveMyHospitalWardsAndRoomsQueryVariables>(RetrieveMyHospitalWardsAndRoomsDocument, options);
        }
export function useRetrieveMyHospitalWardsAndRoomsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.RetrieveMyHospitalWardsAndRoomsQuery, Types.RetrieveMyHospitalWardsAndRoomsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RetrieveMyHospitalWardsAndRoomsQuery, Types.RetrieveMyHospitalWardsAndRoomsQueryVariables>(RetrieveMyHospitalWardsAndRoomsDocument, options);
        }
export type RetrieveMyHospitalWardsAndRoomsQueryHookResult = ReturnType<typeof useRetrieveMyHospitalWardsAndRoomsQuery>;
export type RetrieveMyHospitalWardsAndRoomsLazyQueryHookResult = ReturnType<typeof useRetrieveMyHospitalWardsAndRoomsLazyQuery>;
export type RetrieveMyHospitalWardsAndRoomsSuspenseQueryHookResult = ReturnType<typeof useRetrieveMyHospitalWardsAndRoomsSuspenseQuery>;
export type RetrieveMyHospitalWardsAndRoomsQueryResult = Apollo.QueryResult<Types.RetrieveMyHospitalWardsAndRoomsQuery, Types.RetrieveMyHospitalWardsAndRoomsQueryVariables>;
export const CreateMyHospitalRoomDocument = gql`
    mutation CreateMyHospitalRoom($wardId: Int!, $name: String!, $size: Int) {
  createMyHospitalRoom(wardId: $wardId, name: $name, size: $size) {
    success
    message
    data {
      id
      name
      size
    }
  }
}
    `;
export type CreateMyHospitalRoomMutationFn = Apollo.MutationFunction<Types.CreateMyHospitalRoomMutation, Types.CreateMyHospitalRoomMutationVariables>;

/**
 * __useCreateMyHospitalRoomMutation__
 *
 * To run a mutation, you first call `useCreateMyHospitalRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMyHospitalRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMyHospitalRoomMutation, { data, loading, error }] = useCreateMyHospitalRoomMutation({
 *   variables: {
 *      wardId: // value for 'wardId'
 *      name: // value for 'name'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useCreateMyHospitalRoomMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateMyHospitalRoomMutation, Types.CreateMyHospitalRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateMyHospitalRoomMutation, Types.CreateMyHospitalRoomMutationVariables>(CreateMyHospitalRoomDocument, options);
      }
export type CreateMyHospitalRoomMutationHookResult = ReturnType<typeof useCreateMyHospitalRoomMutation>;
export type CreateMyHospitalRoomMutationResult = Apollo.MutationResult<Types.CreateMyHospitalRoomMutation>;
export type CreateMyHospitalRoomMutationOptions = Apollo.BaseMutationOptions<Types.CreateMyHospitalRoomMutation, Types.CreateMyHospitalRoomMutationVariables>;
export const UpdateHospitalRoomDocument = gql`
    mutation UpdateHospitalRoom($roomId: Int!, $name: String, $wardId: Int, $size: Int) {
  updateHospitalRoom(roomId: $roomId, name: $name, wardId: $wardId, size: $size) {
    success
    message
    data {
      id
      name
      size
    }
  }
}
    `;
export type UpdateHospitalRoomMutationFn = Apollo.MutationFunction<Types.UpdateHospitalRoomMutation, Types.UpdateHospitalRoomMutationVariables>;

/**
 * __useUpdateHospitalRoomMutation__
 *
 * To run a mutation, you first call `useUpdateHospitalRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHospitalRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHospitalRoomMutation, { data, loading, error }] = useUpdateHospitalRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      name: // value for 'name'
 *      wardId: // value for 'wardId'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useUpdateHospitalRoomMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateHospitalRoomMutation, Types.UpdateHospitalRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateHospitalRoomMutation, Types.UpdateHospitalRoomMutationVariables>(UpdateHospitalRoomDocument, options);
      }
export type UpdateHospitalRoomMutationHookResult = ReturnType<typeof useUpdateHospitalRoomMutation>;
export type UpdateHospitalRoomMutationResult = Apollo.MutationResult<Types.UpdateHospitalRoomMutation>;
export type UpdateHospitalRoomMutationOptions = Apollo.BaseMutationOptions<Types.UpdateHospitalRoomMutation, Types.UpdateHospitalRoomMutationVariables>;
export const DeleteHospitalRoomDocument = gql`
    mutation DeleteHospitalRoom($roomId: Int!) {
  deleteHospitalRoom(roomId: $roomId) {
    success
    message
  }
}
    `;
export type DeleteHospitalRoomMutationFn = Apollo.MutationFunction<Types.DeleteHospitalRoomMutation, Types.DeleteHospitalRoomMutationVariables>;

/**
 * __useDeleteHospitalRoomMutation__
 *
 * To run a mutation, you first call `useDeleteHospitalRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHospitalRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHospitalRoomMutation, { data, loading, error }] = useDeleteHospitalRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useDeleteHospitalRoomMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteHospitalRoomMutation, Types.DeleteHospitalRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteHospitalRoomMutation, Types.DeleteHospitalRoomMutationVariables>(DeleteHospitalRoomDocument, options);
      }
export type DeleteHospitalRoomMutationHookResult = ReturnType<typeof useDeleteHospitalRoomMutation>;
export type DeleteHospitalRoomMutationResult = Apollo.MutationResult<Types.DeleteHospitalRoomMutation>;
export type DeleteHospitalRoomMutationOptions = Apollo.BaseMutationOptions<Types.DeleteHospitalRoomMutation, Types.DeleteHospitalRoomMutationVariables>;
export const GetHospitalAdmissionReportOnDateRangeDocument = gql`
    query GetHospitalAdmissionReportOnDateRange($startDate: DateTime!, $endDate: DateTime!, $hospitalId: Int!) {
  getHospitalAdmissionReportOnDateRange(
    startDate: $startDate
    endDate: $endDate
    hospitalId: $hospitalId
  ) {
    date
    totalCount
    currentCount
    enterCount
    leaveCount
    ward {
      date
      totalCount
      currentCount
      enterCount
      leaveCount
      wardInfo {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetHospitalAdmissionReportOnDateRangeQuery__
 *
 * To run a query within a React component, call `useGetHospitalAdmissionReportOnDateRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHospitalAdmissionReportOnDateRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHospitalAdmissionReportOnDateRangeQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      hospitalId: // value for 'hospitalId'
 *   },
 * });
 */
export function useGetHospitalAdmissionReportOnDateRangeQuery(baseOptions: Apollo.QueryHookOptions<Types.GetHospitalAdmissionReportOnDateRangeQuery, Types.GetHospitalAdmissionReportOnDateRangeQueryVariables> & ({ variables: Types.GetHospitalAdmissionReportOnDateRangeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetHospitalAdmissionReportOnDateRangeQuery, Types.GetHospitalAdmissionReportOnDateRangeQueryVariables>(GetHospitalAdmissionReportOnDateRangeDocument, options);
      }
export function useGetHospitalAdmissionReportOnDateRangeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetHospitalAdmissionReportOnDateRangeQuery, Types.GetHospitalAdmissionReportOnDateRangeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetHospitalAdmissionReportOnDateRangeQuery, Types.GetHospitalAdmissionReportOnDateRangeQueryVariables>(GetHospitalAdmissionReportOnDateRangeDocument, options);
        }
export function useGetHospitalAdmissionReportOnDateRangeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetHospitalAdmissionReportOnDateRangeQuery, Types.GetHospitalAdmissionReportOnDateRangeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetHospitalAdmissionReportOnDateRangeQuery, Types.GetHospitalAdmissionReportOnDateRangeQueryVariables>(GetHospitalAdmissionReportOnDateRangeDocument, options);
        }
export type GetHospitalAdmissionReportOnDateRangeQueryHookResult = ReturnType<typeof useGetHospitalAdmissionReportOnDateRangeQuery>;
export type GetHospitalAdmissionReportOnDateRangeLazyQueryHookResult = ReturnType<typeof useGetHospitalAdmissionReportOnDateRangeLazyQuery>;
export type GetHospitalAdmissionReportOnDateRangeSuspenseQueryHookResult = ReturnType<typeof useGetHospitalAdmissionReportOnDateRangeSuspenseQuery>;
export type GetHospitalAdmissionReportOnDateRangeQueryResult = Apollo.QueryResult<Types.GetHospitalAdmissionReportOnDateRangeQuery, Types.GetHospitalAdmissionReportOnDateRangeQueryVariables>;