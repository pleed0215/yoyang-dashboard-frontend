export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  /** 가입 신청된 병원 정보를 가져옵니다. */
  hospital: HospitalType;
  hospitalId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  state: CommonState;
  /** 병원 가입 신청을 한 사용자 정보를 가져옵니다. */
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
  /** 이메일과 비밀번호로 로그인합니다. */
  login: LoginOutput;
  /** 현재 로그인된 사용자를 로그아웃합니다. */
  logout: LogoutOutput;
  /** 회원 가입을 진행합니다. */
  signup: GetUserOutput;
  /** 병원에서 직원을 제외합니다. ADMIN 전용 */
  unlinkStaff: CommonResponse;
  /** 사용자 프로필 정보를 업데이트합니다. 로그인 필수. */
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
  superOnlyRetrievePendingUsers: RetrievePendingUsersOutput;
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


export type QuerySuperOnlyRetrievePendingUsersArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};

export type RetrieveJoinRequestOutput = {
  __typename?: 'RetrieveJoinRequestOutput';
  data: Array<HospitalJoinRequestType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  pageInfo?: Maybe<PageInfo>;
  success: Scalars['Boolean']['output'];
};

export type RetrievePendingUsersOutput = {
  __typename?: 'RetrievePendingUsersOutput';
  data: Array<UserType>;
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'GetUserOutput', success: boolean, message?: string | null, errors?: Array<{ __typename?: 'GraphQLError', message: string }> | null, data?: { __typename?: 'UserType', id: string, username: string, email: string, hospitalId?: number | null, hospitalRequestId?: number | null, role: UserRole, state: CommonState } | null } };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'UserType', id: string, username: string, email: string, hospitalId?: number | null, hospitalRequestId?: number | null, role: UserRole, state: CommonState } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', success: boolean, message?: string | null, data?: { __typename?: 'TokenOutput', accessToken: string, refreshToken: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutOutput', success: boolean, message?: string | null } };

export type SignupMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'GetUserOutput', success: boolean, message?: string | null, errors?: Array<{ __typename?: 'GraphQLError', message: string }> | null, data?: { __typename?: 'UserType', id: string, username: string, email: string } | null } };

export type RetrievePendingUsersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RetrievePendingUsersQuery = { __typename?: 'Query', superOnlyRetrievePendingUsers: { __typename?: 'RetrievePendingUsersOutput', success: boolean, message?: string | null, pageInfo?: { __typename?: 'PageInfo', currentPage: number, hasNextPage: boolean, hasPreviousPage: boolean, total?: number | null, totalPages: number } | null, data: Array<{ __typename?: 'UserType', id: string, email: string, username: string, state: CommonState }> } };
