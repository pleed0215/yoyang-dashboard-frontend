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

export type BaseHospitalInfoOutput = {
  __typename?: 'BaseHospitalInfoOutput';
  data?: Maybe<BaseHospitalType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type BaseHospitalType = {
  __typename?: 'BaseHospitalType';
  addr: Scalars['String']['output'];
  located: Scalars['String']['output'];
  name: Scalars['String']['output'];
  registered: Scalars['Boolean']['output'];
  telno: Scalars['String']['output'];
  ykiho: Scalars['String']['output'];
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

export type GetHospitalInfoByYkihoOutput = {
  __typename?: 'GetHospitalInfoByYkihoOutput';
  data?: Maybe<HospitalType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
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
  message: Scalars['String']['output'];
  state: CommonState;
  /** 병원 가입 신청을 한 사용자 정보를 가져옵니다. */
  user: UserType;
  userId: Scalars['Int']['output'];
};

export type HospitalRegisterRequestType = {
  __typename?: 'HospitalRegisterRequestType';
  id: Scalars['ID']['output'];
  state: CommonState;
  userId: Scalars['Float']['output'];
  ykiho: Scalars['String']['output'];
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

export type JoinHospitalRequestOutput = {
  __typename?: 'JoinHospitalRequestOutput';
  data?: Maybe<HospitalJoinRequestType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
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

export type ManyUserIdInput = {
  userIds: Array<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptCreateHospitalRequest: CommonResponse;
  /** 요청된 병원 가입신청을 허가힙니다. ADMIN 유저 전용. */
  acceptJoinRequest: CommonResponse;
  deleteJoinRequestForCurrentUser: CommonResponse;
  denyCreateHospitalRequest: CommonResponse;
  /** 요청된 가입신청을 거절합니다. ADMIN 전용 */
  denyJoinRequest: CommonResponse;
  /** 이메일과 비밀번호로 로그인합니다. */
  login: LoginOutput;
  /** 현재 로그인된 사용자를 로그아웃합니다. */
  logout: LogoutOutput;
  requestCreateHospital: RequestCreateHospitalOutput;
  requestJoinHospital: JoinHospitalRequestOutput;
  /** 회원 가입을 진행합니다. */
  signup: GetUserOutput;
  superOnlyUpdateManyUserStatus: CommonResponse;
  superOnlyUpdateUserStatus: CommonResponse;
  unlinkManyUserForAdmin: CommonResponse;
  /** 병원에서 직원을 제외합니다. ADMIN 전용 */
  unlinkStaff: CommonResponse;
  unlinkUserForAdmin: CommonResponse;
  updateManyUserStatusForAdmin: CommonResponse;
  /** 사용자 프로필 정보를 업데이트합니다. 로그인 필수. */
  updateProfile: UpdateProfileOutput;
  updateUserStatusForAdmin: CommonResponse;
};


export type MutationAcceptCreateHospitalRequestArgs = {
  requestId: Scalars['Int']['input'];
};


export type MutationAcceptJoinRequestArgs = {
  requestId: Scalars['Int']['input'];
};


export type MutationDenyCreateHospitalRequestArgs = {
  requestId: Scalars['Int']['input'];
};


export type MutationDenyJoinRequestArgs = {
  requestId: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRequestCreateHospitalArgs = {
  ykiho: Scalars['String']['input'];
};


export type MutationRequestJoinHospitalArgs = {
  hospitalId: Scalars['Int']['input'];
  message?: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSuperOnlyUpdateManyUserStatusArgs = {
  input: UpdateManyUserStatusInput;
};


export type MutationSuperOnlyUpdateUserStatusArgs = {
  input: UpdateUserStatusInput;
};


export type MutationUnlinkManyUserForAdminArgs = {
  input: ManyUserIdInput;
};


export type MutationUnlinkStaffArgs = {
  staffId: Scalars['Float']['input'];
};


export type MutationUnlinkUserForAdminArgs = {
  input: UserIdInput;
};


export type MutationUpdateManyUserStatusForAdminArgs = {
  input: UpdateManyUserStatusInput;
};


export type MutationUpdateProfileArgs = {
  username: Scalars['String']['input'];
};


export type MutationUpdateUserStatusForAdminArgs = {
  input: UpdateUserStatusInput;
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
  adminOnlyRetrieveJoinRequest: RetrieveJoinRequestOutput;
  getHospitalByYkiho: GetHospitalInfoByYkihoOutput;
  getHospitalInfoByYkiho: BaseHospitalInfoOutput;
  getJoinRequestByCurrentUser: JoinHospitalRequestOutput;
  getRegisterRequest: RequestCreateHospitalOutput;
  /** 테스트용 */
  getUserById: UserType;
  /** 현재 사용자의 프로필 데이터를 가져옵니다. 로그인 토큰 필수. */
  me: GetUserOutput;
  retrieveCreateHospitalRequest: RetrieveCreateHospitalListOutput;
  retrieveHospitalList: RetrieveHospitalListOutput;
  retrieveHospitalUsersForAdmin: RetrieveUserOutput;
  /** ADMIN 유저의 병원 유저 목록을 받아옵니다. 로그인 필수. Pagination 가능. */
  retrieveStaff: RetrieveUserOutput;
  /** 병원에 소속된 직원 정보를 가져옵니다. */
  retrieveStaffInfo: GetUserOutput;
  /** 슈퍼 유저 전용. 입력된 role 값으로 사용자들을 찾습니다. */
  superFindUserByRole: Array<UserType>;
  superOnlyRetrievePendingUsers: RetrievePendingUsersOutput;
  superOnlyRetrieveUserList: RetrieveUserOutput;
};


export type QueryAdminOnlyRetrieveJoinRequestArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryGetHospitalByYkihoArgs = {
  ykiho: Scalars['String']['input'];
};


export type QueryGetHospitalInfoByYkihoArgs = {
  ykiho: Scalars['String']['input'];
};


export type QueryGetRegisterRequestArgs = {
  ykiho: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRetrieveCreateHospitalRequestArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryRetrieveHospitalListArgs = {
  hospitalName: Scalars['String']['input'];
};


export type QueryRetrieveHospitalUsersForAdminArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  role?: InputMaybe<UserRole>;
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


export type QuerySuperOnlyRetrieveUserListArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  role?: UserRole;
  state?: CommonState;
};

export type RequestCreateHospitalOutput = {
  __typename?: 'RequestCreateHospitalOutput';
  data?: Maybe<HospitalRegisterRequestType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type RetrieveCreateHospitalListOutput = {
  __typename?: 'RetrieveCreateHospitalListOutput';
  data?: Maybe<Array<HospitalRegisterRequestType>>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  pageInfo?: Maybe<PageInfo>;
  success: Scalars['Boolean']['output'];
};

export type RetrieveHospitalListOutput = {
  __typename?: 'RetrieveHospitalListOutput';
  data?: Maybe<Array<BaseHospitalType>>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  pageInfo?: Maybe<PageInfo>;
  success: Scalars['Boolean']['output'];
};

export type RetrieveJoinRequestOutput = {
  __typename?: 'RetrieveJoinRequestOutput';
  data?: Maybe<Array<HospitalJoinRequestType>>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  pageInfo?: Maybe<PageInfo>;
  success: Scalars['Boolean']['output'];
};

export type RetrievePendingUsersOutput = {
  __typename?: 'RetrievePendingUsersOutput';
  data?: Maybe<Array<UserType>>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  pageInfo?: Maybe<PageInfo>;
  success: Scalars['Boolean']['output'];
};

export type RetrieveUserOutput = {
  __typename?: 'RetrieveUserOutput';
  data?: Maybe<Array<UserType>>;
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

export type UpdateManyUserStatusInput = {
  users: Array<UpdateUserStatusInput>;
};

export type UpdateProfileOutput = {
  __typename?: 'UpdateProfileOutput';
  data?: Maybe<UserType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateUserStatusInput = {
  role?: InputMaybe<UserRole>;
  state?: InputMaybe<CommonState>;
  userId: Scalars['Int']['input'];
};

export type UserIdInput = {
  userId: Scalars['Int']['input'];
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

export type RetrieveHospitalListQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type RetrieveHospitalListQuery = { __typename?: 'Query', retrieveHospitalList: { __typename?: 'RetrieveHospitalListOutput', success: boolean, message?: string | null, data?: Array<{ __typename?: 'BaseHospitalType', ykiho: string, name: string, telno: string, located: string, addr: string, registered: boolean }> | null } };

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


export type RetrievePendingUsersQuery = { __typename?: 'Query', superOnlyRetrievePendingUsers: { __typename?: 'RetrievePendingUsersOutput', success: boolean, message?: string | null, pageInfo?: { __typename?: 'PageInfo', currentPage: number, hasNextPage: boolean, hasPreviousPage: boolean, total?: number | null, totalPages: number } | null, data?: Array<{ __typename?: 'UserType', id: string, email: string, username: string, state: CommonState }> | null } };

export type RetrieveUserListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  role: UserRole;
  state: CommonState;
}>;


export type RetrieveUserListQuery = { __typename?: 'Query', superOnlyRetrieveUserList: { __typename?: 'RetrieveUserOutput', success: boolean, pageInfo?: { __typename?: 'PageInfo', currentPage: number, hasPreviousPage: boolean, hasNextPage: boolean, total?: number | null, totalPages: number } | null, data?: Array<{ __typename?: 'UserType', id: string, email: string, username: string, state: CommonState, role: UserRole }> | null } };

export type UpdateManyUserStatusMutationVariables = Exact<{
  input: UpdateManyUserStatusInput;
}>;


export type UpdateManyUserStatusMutation = { __typename?: 'Mutation', superOnlyUpdateManyUserStatus: { __typename?: 'CommonResponse', success: boolean, message?: string | null } };

export type RetrieveCreateHospitalRequestQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RetrieveCreateHospitalRequestQuery = { __typename?: 'Query', retrieveCreateHospitalRequest: { __typename?: 'RetrieveCreateHospitalListOutput', success: boolean, message?: string | null, pageInfo?: { __typename?: 'PageInfo', currentPage: number, hasNextPage: boolean, hasPreviousPage: boolean, total?: number | null, totalPages: number } | null, data?: Array<{ __typename?: 'HospitalRegisterRequestType', id: string, userId: number, ykiho: string, state: CommonState }> | null } };

export type AcceptCreateHospitalRequestMutationVariables = Exact<{
  requestId: Scalars['Int']['input'];
}>;


export type AcceptCreateHospitalRequestMutation = { __typename?: 'Mutation', acceptCreateHospitalRequest: { __typename?: 'CommonResponse', success: boolean, message?: string | null } };

export type DenyCreateHospitalRequestMutationVariables = Exact<{
  requestId: Scalars['Int']['input'];
}>;


export type DenyCreateHospitalRequestMutation = { __typename?: 'Mutation', denyCreateHospitalRequest: { __typename?: 'CommonResponse', success: boolean, message?: string | null } };

export type RequestCreateHospitalMutationVariables = Exact<{
  ykiho: Scalars['String']['input'];
}>;


export type RequestCreateHospitalMutation = { __typename?: 'Mutation', requestCreateHospital: { __typename?: 'RequestCreateHospitalOutput', success: boolean, message?: string | null, data?: { __typename?: 'HospitalRegisterRequestType', id: string, ykiho: string, state: CommonState } | null } };

export type GetRequestHospitalQueryVariables = Exact<{
  ykiho: Scalars['String']['input'];
}>;


export type GetRequestHospitalQuery = { __typename?: 'Query', getRegisterRequest: { __typename?: 'RequestCreateHospitalOutput', success: boolean, message?: string | null, data?: { __typename?: 'HospitalRegisterRequestType', id: string, ykiho: string, state: CommonState } | null } };

export type GetHospitalInfoQueryVariables = Exact<{
  ykiho: Scalars['String']['input'];
}>;


export type GetHospitalInfoQuery = { __typename?: 'Query', getHospitalInfoByYkiho: { __typename?: 'BaseHospitalInfoOutput', success: boolean, message?: string | null, data?: { __typename?: 'BaseHospitalType', ykiho: string, name: string, addr: string, telno: string, located: string } | null } };

export type RetrieveJoinRequestQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RetrieveJoinRequestQuery = { __typename?: 'Query', adminOnlyRetrieveJoinRequest: { __typename?: 'RetrieveJoinRequestOutput', success: boolean, message?: string | null, pageInfo?: { __typename?: 'PageInfo', currentPage: number, hasNextPage: boolean, hasPreviousPage: boolean, total?: number | null, totalPages: number } | null, data?: Array<{ __typename?: 'HospitalJoinRequestType', id: string, message: string, user: { __typename?: 'UserType', id: string, username: string, email: string } }> | null } };

export type AcceptJoinRequestMutationVariables = Exact<{
  requestId: Scalars['Int']['input'];
}>;


export type AcceptJoinRequestMutation = { __typename?: 'Mutation', acceptJoinRequest: { __typename?: 'CommonResponse', success: boolean, message?: string | null } };

export type DenyJoinRequestMutationVariables = Exact<{
  requestId: Scalars['Int']['input'];
}>;


export type DenyJoinRequestMutation = { __typename?: 'Mutation', denyJoinRequest: { __typename?: 'CommonResponse', success: boolean, message?: string | null } };

export type GetHospitalByYkihoQueryVariables = Exact<{
  ykiho: Scalars['String']['input'];
}>;


export type GetHospitalByYkihoQuery = { __typename?: 'Query', getHospitalByYkiho: { __typename?: 'GetHospitalInfoByYkihoOutput', success: boolean, message?: string | null, data?: { __typename?: 'HospitalType', id: string, name: string, located?: string | null } | null } };

export type RequestJoinHospitalMutationVariables = Exact<{
  hospitalId: Scalars['Int']['input'];
  message: Scalars['String']['input'];
}>;


export type RequestJoinHospitalMutation = { __typename?: 'Mutation', requestJoinHospital: { __typename?: 'JoinHospitalRequestOutput', success: boolean, message?: string | null, data?: { __typename?: 'HospitalJoinRequestType', id: string, state: CommonState } | null } };

export type GetJoinRequestByCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJoinRequestByCurrentUserQuery = { __typename?: 'Query', getJoinRequestByCurrentUser: { __typename?: 'JoinHospitalRequestOutput', success: boolean, message?: string | null, data?: { __typename?: 'HospitalJoinRequestType', id: string, state: CommonState, hospital: { __typename?: 'HospitalType', name: string, located?: string | null, state: CommonState } } | null } };

export type DeleteJoinRequestForCurrentUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteJoinRequestForCurrentUserMutation = { __typename?: 'Mutation', deleteJoinRequestForCurrentUser: { __typename?: 'CommonResponse', success: boolean, message?: string | null } };

export type RetrieveHospitalUsersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<UserRole>;
}>;


export type RetrieveHospitalUsersQuery = { __typename?: 'Query', retrieveHospitalUsersForAdmin: { __typename?: 'RetrieveUserOutput', success: boolean, message?: string | null, pageInfo?: { __typename?: 'PageInfo', currentPage: number, hasNextPage: boolean, hasPreviousPage: boolean, total?: number | null, totalPages: number } | null, data?: Array<{ __typename?: 'UserType', id: string, username: string, email: string, role: UserRole, state: CommonState }> | null } };

export type UpdateManyUserStatusForAdminMutationVariables = Exact<{
  input: UpdateManyUserStatusInput;
}>;


export type UpdateManyUserStatusForAdminMutation = { __typename?: 'Mutation', updateManyUserStatusForAdmin: { __typename?: 'CommonResponse', success: boolean, message?: string | null } };

export type UnlinkManyUserFromHospitalForAdminMutationVariables = Exact<{
  input: ManyUserIdInput;
}>;


export type UnlinkManyUserFromHospitalForAdminMutation = { __typename?: 'Mutation', unlinkManyUserForAdmin: { __typename?: 'CommonResponse', success: boolean, message?: string | null } };

export type UnlinkUserFromHospitalForAdminMutationVariables = Exact<{
  input: UserIdInput;
}>;


export type UnlinkUserFromHospitalForAdminMutation = { __typename?: 'Mutation', unlinkUserForAdmin: { __typename?: 'CommonResponse', success: boolean, message?: string | null } };
