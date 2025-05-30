import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CommonResponse = {
  __typename?: 'CommonResponse';
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum CommonState {
  Accepted = 'ACCEPTED',
  Active = 'ACTIVE',
  Denied = 'DENIED',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
  PendingDeletion = 'PENDING_DELETION'
}

/** Application error codes */
export enum ErrorCode {
  AlreadyLoggedIn = 'ALREADY_LOGGED_IN',
  AuthenticationError = 'AUTHENTICATION_ERROR',
  AuthorizationError = 'AUTHORIZATION_ERROR',
  BadRequest = 'BAD_REQUEST',
  InsufficientPermissions = 'INSUFFICIENT_PERMISSIONS',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidToken = 'INVALID_TOKEN',
  LoginRequired = 'LOGIN_REQUIRED',
  NotFound = 'NOT_FOUND',
  RefreshTokenExpired = 'REFRESH_TOKEN_EXPIRED',
  TokenExpired = 'TOKEN_EXPIRED',
  ValidationError = 'VALIDATION_ERROR'
}

export type ErrorDetail = {
  __typename?: 'ErrorDetail';
  path: Scalars['String']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type GetUserOutput = {
  __typename?: 'GetUserOutput';
  data?: Maybe<UserType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type GraphQlError = {
  __typename?: 'GraphQLError';
  code: ErrorCode;
  details?: Maybe<Array<ErrorDetail>>;
  message: Scalars['String']['output'];
  stack?: Maybe<Scalars['String']['output']>;
};

export type HospitalJoinRequestType = {
  __typename?: 'HospitalJoinRequestType';
  hospital: HospitalType;
  hospitalId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  state: CommonState;
  user: UserType;
  userId: Scalars['Int']['output'];
};

export type HospitalType = {
  __typename?: 'HospitalType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  located?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  state: CommonState;
  updatedAt: Scalars['DateTime']['output'];
  ykiho: Scalars['String']['output'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  data?: Maybe<TokenOutput>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type LogoutOutput = {
  __typename?: 'LogoutOutput';
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 요청된 병원 가입신청을 허가힙니다. ADMIN 유저 전용. */
  acceptJoinRequest: CommonResponse;
  /** 요청된 가입신청을 거절합니다. ADMIN 전용 */
  denyJoinRequest: CommonResponse;
  login: LoginOutput;
  logout: LogoutOutput;
  /** 회원 가입을 진행합니다. */
  signup: GetUserOutput;
  /** 병원에서 직원을 제외합니다. ADMIN 전용 */
  unlinkStaff: CommonResponse;
  updateProfile: UpdateProfileOutput;
};


export type MutationAcceptJoinRequestArgs = {
  requestId: Scalars['Float']['input'];
};


export type MutationDenyJoinRequestArgs = {
  requestId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUnlinkStaffArgs = {
  staffId: Scalars['Float']['input'];
};


export type MutationUpdateProfileArgs = {
  username: Scalars['String']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  itemsPerPage: Scalars['Int']['output'];
  total?: Maybe<Scalars['Int']['output']>;
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** ADMIN 유저 전용. 병원에 가입 신청 목록을 가져옵니다. Pagination 가능. */
  adminOnlyRetrieveJoinRequestList: RetrieveJoinRequestOutput;
  /** 테스트용 */
  getUserById: UserType;
  /** 현재 사용자의 프로필 데이터를 가져옵니다. 로그인 토큰 필수. */
  me: GetUserOutput;
  /** ADMIN 유저의 병원 유저 목록을 받아옵니다. 로그인 필수. Pagination 가능. */
  retrieveStaff: RetrieveUserListOutput;
  /** 병원에 소속된 직원 정보를 가져옵니다. */
  retrieveStaffInfo: GetUserOutput;
  /** 슈퍼 유저 전용. 입력된 role 값으로 사용자들을 찾습니다. */
  superFindUserByRole: Array<UserType>;
};


export type QueryAdminOnlyRetrieveJoinRequestListArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRetrieveStaffArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryRetrieveStaffInfoArgs = {
  staffId: Scalars['Float']['input'];
};


export type QuerySuperFindUserByRoleArgs = {
  role: Scalars['String']['input'];
};

export type RetrieveJoinRequestOutput = {
  __typename?: 'RetrieveJoinRequestOutput';
  data: Array<HospitalJoinRequestType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  pageInfo?: Maybe<PageInfo>;
  success: Scalars['Boolean']['output'];
};

export type RetrieveUserListOutput = {
  __typename?: 'RetrieveUserListOutput';
  data: Array<UserType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  pageInfo?: Maybe<PageInfo>;
  success: Scalars['Boolean']['output'];
};

export type TokenOutput = {
  __typename?: 'TokenOutput';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type UpdateProfileOutput = {
  __typename?: 'UpdateProfileOutput';
  data?: Maybe<UserType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Staff = 'STAFF',
  Super = 'SUPER'
}

export type UserType = {
  __typename?: 'UserType';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  hospital?: Maybe<HospitalType>;
  hospitalId?: Maybe<Scalars['Float']['output']>;
  hospitalRequest?: Maybe<HospitalJoinRequestType>;
  hospitalRequestId?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  role: UserRole;
  state: CommonState;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', success: boolean, data?: { __typename?: 'TokenOutput', accessToken: string, refreshToken: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutOutput', success: boolean } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'GetUserOutput', success: boolean, message?: string | null, data?: { __typename?: 'UserType', id: string, email: string, hospitalId?: number | null, hospitalRequestId?: number | null } | null } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', me: { __typename?: 'GetUserOutput', success: boolean, data?: { __typename?: 'UserType', id: string, email: string, username: string, hospitalId?: number | null, hospitalRequestId?: number | null } | null } };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'UserType', id: string, email: string, username: string, hospitalId?: number | null, hospitalRequestId?: number | null } };


export const LoginDocument = gql`
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetUserDocument = gql`
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

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUserByIdDocument = gql`
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
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables> & ({ variables: GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;