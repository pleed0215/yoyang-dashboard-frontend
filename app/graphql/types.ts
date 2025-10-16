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
  Upload: { input: any; output: any; }
};

export type AdmitFee = {
  __typename?: 'AdmitFee';
  createdAt: Scalars['DateTime']['output'];
  hospitalId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  insuranceFee: Scalars['Int']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  nonInsuranceFee: Scalars['Int']['output'];
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  patient: Patient;
  patientId: Scalars['Int']['output'];
  selfFee: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum AdmitFeePaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Card = 'CARD',
  Cash = 'CASH',
  Etc = 'ETC'
}

export type AdmitFeeResponse = {
  __typename?: 'AdmitFeeResponse';
  data?: Maybe<AdmitFee>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum AdmitFeeState {
  Cancelled = 'CANCELLED',
  Paid = 'PAID',
  Refunded = 'REFUNDED',
  Requesting = 'REQUESTING'
}

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

export type BulkCreatePatientDetail = {
  __typename?: 'BulkCreatePatientDetail';
  chartId: Scalars['Float']['output'];
  patient?: Maybe<Patient>;
  reason?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type BulkCreatePatientsFromFileInput = {
  duplicateStrategy?: DuplicateHandlingStrategy;
  file: Scalars['Upload']['input'];
  fileType: PatientFileType;
  hospitalId: Scalars['Int']['input'];
};

export type BulkCreatePatientsInput = {
  duplicateStrategy?: DuplicateHandlingStrategy;
  patients: Array<CreatePatientInput>;
};

export type BulkCreatePatientsResponse = {
  __typename?: 'BulkCreatePatientsResponse';
  createdCount: Scalars['Int']['output'];
  createdPatients: Array<Patient>;
  details: Array<BulkCreatePatientDetail>;
  failedCount: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  overriddenCount: Scalars['Int']['output'];
  skippedCount: Scalars['Int']['output'];
  strategy: DuplicateHandlingStrategy;
  success: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
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

export type CreateAdmitFeeInputDto = {
  hospitalId: Scalars['Int']['input'];
  insuranceFee: Scalars['Float']['input'];
  memo?: InputMaybe<Scalars['String']['input']>;
  nonInsuranceFee: Scalars['Float']['input'];
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  patientId: Scalars['Int']['input'];
  paymentMethod?: InputMaybe<AdmitFeePaymentMethod>;
  selfFee: Scalars['Float']['input'];
  state?: InputMaybe<AdmitFeeState>;
};

export type CreateHospitalCommitteeOutput = {
  __typename?: 'CreateHospitalCommitteeOutput';
  data?: Maybe<HospitalCommitteeType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateHospitalDutyOutput = {
  __typename?: 'CreateHospitalDutyOutput';
  data?: Maybe<HospitalDutyType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateHospitalPositionOutput = {
  __typename?: 'CreateHospitalPositionOutput';
  data?: Maybe<HospitalPositionType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateHospitalRoomOutput = {
  __typename?: 'CreateHospitalRoomOutput';
  data?: Maybe<HospitalRoomType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateHospitalWardOutput = {
  __typename?: 'CreateHospitalWardOutput';
  data?: Maybe<HospitalWardType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreatePatientInput = {
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  chartId: Scalars['Int']['input'];
  enterDate?: InputMaybe<Scalars['DateTime']['input']>;
  gender?: InputMaybe<PatientGender>;
  hospitalId: Scalars['Int']['input'];
  leaveDate?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  roomId: Scalars['Int']['input'];
  wardId: Scalars['Int']['input'];
};

export type DeleteHospitalCommitteeOutput = {
  __typename?: 'DeleteHospitalCommitteeOutput';
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteHospitalDutyOutput = {
  __typename?: 'DeleteHospitalDutyOutput';
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteHospitalPositionOutput = {
  __typename?: 'DeleteHospitalPositionOutput';
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteHospitalRoomOutput = {
  __typename?: 'DeleteHospitalRoomOutput';
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteHospitalWardOutput = {
  __typename?: 'DeleteHospitalWardOutput';
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** 중복 환자 처리 방식 */
export enum DuplicateHandlingStrategy {
  Cancel = 'CANCEL',
  Override = 'OVERRIDE',
  Skip = 'SKIP'
}

export type EmployeeCreateInput = {
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  cellPhone?: InputMaybe<Scalars['String']['input']>;
  dutyId?: InputMaybe<Scalars['Int']['input']>;
  enterDate?: InputMaybe<Scalars['DateTime']['input']>;
  hospitalId: Scalars['Int']['input'];
  leaveDate?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  positionId?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<EmployeeState>;
  wardId?: InputMaybe<Scalars['Int']['input']>;
};

export type EmployeeDeleteOutput = {
  __typename?: 'EmployeeDeleteOutput';
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type EmployeeOutput = {
  __typename?: 'EmployeeOutput';
  data?: Maybe<EmployeeType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** 직원 상태 (ACTIVE, INACTIVE) */
export enum EmployeeState {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type EmployeeType = {
  __typename?: 'EmployeeType';
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  cellPhone?: Maybe<Scalars['String']['output']>;
  committees?: Maybe<Array<HospitalCommitteeType>>;
  createdAt: Scalars['DateTime']['output'];
  duty?: Maybe<HospitalDutyType>;
  dutyId?: Maybe<Scalars['Int']['output']>;
  enterDate?: Maybe<Scalars['DateTime']['output']>;
  hospitalId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  leaveDate?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  parts?: Maybe<Array<HospitalPartType>>;
  position?: Maybe<HospitalPositionType>;
  positionId?: Maybe<Scalars['Int']['output']>;
  rooms?: Maybe<Array<HospitalRoomType>>;
  state: EmployeeState;
  updatedAt: Scalars['DateTime']['output'];
  ward?: Maybe<HospitalWardType>;
  wardId?: Maybe<Scalars['Int']['output']>;
};

export type EmployeeUpdateInput = {
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  cellPhone?: InputMaybe<Scalars['String']['input']>;
  dutyId?: InputMaybe<Scalars['Int']['input']>;
  enterDate?: InputMaybe<Scalars['DateTime']['input']>;
  hospitalId?: InputMaybe<Scalars['Int']['input']>;
  leaveDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  positionId?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<EmployeeState>;
  wardId?: InputMaybe<Scalars['Int']['input']>;
};

export type EmployeesOutput = {
  __typename?: 'EmployeesOutput';
  data?: Maybe<Array<EmployeeType>>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  pageInfo?: Maybe<PageInfo>;
  success: Scalars['Boolean']['output'];
};

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

export type HospitalAdmissionReport = {
  __typename?: 'HospitalAdmissionReport';
  currentCount: Scalars['Int']['output'];
  date: Scalars['DateTime']['output'];
  enterCount: Scalars['Int']['output'];
  hospitalId: Scalars['Int']['output'];
  leaveCount: Scalars['Int']['output'];
  patients?: Maybe<Array<Patient>>;
  totalCount: Scalars['Int']['output'];
  ward?: Maybe<Array<WardAdmissionReport>>;
};

export type HospitalCommitteeType = {
  __typename?: 'HospitalCommitteeType';
  hospitalId: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** 이 위원회에 속한 직원 목록 */
  staff?: Maybe<Array<EmployeeType>>;
};

export type HospitalDutyType = {
  __typename?: 'HospitalDutyType';
  hospitalId: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** 이 직무에 속한 직원 목록 */
  staff?: Maybe<Array<EmployeeType>>;
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

export type HospitalPartType = {
  __typename?: 'HospitalPartType';
  hospitalId: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** 이 파트에 속한 직원 목록 */
  staff?: Maybe<Array<EmployeeType>>;
};

export type HospitalPatientCount = {
  __typename?: 'HospitalPatientCount';
  date: Scalars['DateTime']['output'];
  hospitalId: Scalars['Int']['output'];
  patients?: Maybe<Array<Patient>>;
  totalCount: Scalars['Int']['output'];
  ward?: Maybe<Array<WardPatientCount>>;
};

export type HospitalPatientCountResponse = {
  __typename?: 'HospitalPatientCountResponse';
  data?: Maybe<HospitalPatientCount>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type HospitalPositionType = {
  __typename?: 'HospitalPositionType';
  hospitalId: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** 이 직책에 속한 직원 목록 */
  staff?: Maybe<Array<EmployeeType>>;
};

export type HospitalRegisterRequestType = {
  __typename?: 'HospitalRegisterRequestType';
  id: Scalars['Int']['output'];
  state: CommonState;
  userId: Scalars['Float']['output'];
  ykiho: Scalars['String']['output'];
};

export type HospitalRoomType = {
  __typename?: 'HospitalRoomType';
  hospitalId: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  size?: Maybe<Scalars['Float']['output']>;
  /** 이 병실에 속한 직원 목록 */
  staff?: Maybe<Array<EmployeeType>>;
  /** 이 병실이 속한 병동 */
  ward: HospitalWardType;
  wardId: Scalars['Float']['output'];
};

export type HospitalType = {
  __typename?: 'HospitalType';
  createdAt: Scalars['DateTime']['output'];
  /** 병원에 가입 신청한 요청 목록을 가져옵니다. */
  hospitalJoinRequests?: Maybe<Array<HospitalJoinRequestType>>;
  id: Scalars['Int']['output'];
  located?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  state: CommonState;
  updatedAt: Scalars['DateTime']['output'];
  /** 병원에 소속된 사용자 목록을 가져옵니다. */
  users?: Maybe<Array<UserType>>;
  ykiho: Scalars['String']['output'];
};

export type HospitalWardType = {
  __typename?: 'HospitalWardType';
  hospitalId: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  rooms?: Maybe<Array<HospitalRoomType>>;
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
  addEmployeeCommittee: EmployeeOutput;
  addEmployeePart: EmployeeOutput;
  addEmployeeRoom: EmployeeOutput;
  bulkCreatePatients: BulkCreatePatientsResponse;
  bulkCreatePatientsFromFile: BulkCreatePatientsResponse;
  createAdmitFee: AdmitFeeResponse;
  createEmployee: EmployeeOutput;
  /** 병원 위원회를 생성합니다. */
  createHospitalCommittee: CreateHospitalCommitteeOutput;
  /** 병원 기본 데이터를 생성합니다. */
  createHospitalDefaultData: CommonResponse;
  /** 병원 직무를 생성합니다. */
  createHospitalDuty: CreateHospitalDutyOutput;
  /** 병원 파트를 생성합니다. */
  createHospitalPart: CreateHospitalPositionOutput;
  /** 병원 직책을 생성합니다. */
  createHospitalPosition: CreateHospitalPositionOutput;
  /** 병원 병실을 생성합니다. */
  createHospitalRoom: CreateHospitalRoomOutput;
  /** 병원 병동을 생성합니다. */
  createHospitalWard: CreateHospitalWardOutput;
  /** 나의 병원 위원회를 생성합니다. (로그인 기반) */
  createMyHospitalCommittee: CreateHospitalCommitteeOutput;
  /** 나의 병원 기본 데이터를 생성합니다. (로그인 기반) */
  createMyHospitalDefaultData: CommonResponse;
  /** 나의 병원 직무를 생성합니다. (로그인 기반) */
  createMyHospitalDuty: CreateHospitalDutyOutput;
  /** 나의 병원 파트를 생성합니다. (로그인 기반) */
  createMyHospitalPart: CreateHospitalPositionOutput;
  /** 나의 병원 직책을 생성합니다. (로그인 기반) */
  createMyHospitalPosition: CreateHospitalPositionOutput;
  /** 나의 병원 병실을 생성합니다. (로그인 기반) */
  createMyHospitalRoom: CreateHospitalRoomOutput;
  /** 나의 병원 병동을 생성합니다. (로그인 기반) */
  createMyHospitalWard: CreateHospitalWardOutput;
  createPatient: PatientResponse;
  deleteAdmitFee: CommonResponse;
  deleteEmployee: EmployeeDeleteOutput;
  /** 병원 위원회를 삭제합니다. */
  deleteHospitalCommittee: DeleteHospitalCommitteeOutput;
  /** 병원 직무를 삭제합니다. */
  deleteHospitalDuty: DeleteHospitalDutyOutput;
  /** 병원 파트를 삭제합니다. */
  deleteHospitalPart: DeleteHospitalPositionOutput;
  /** 병원 직책을 삭제합니다. */
  deleteHospitalPosition: DeleteHospitalPositionOutput;
  /** 병원 병실을 삭제합니다. */
  deleteHospitalRoom: DeleteHospitalRoomOutput;
  /** 병원 병동을 삭제합니다. */
  deleteHospitalWard: DeleteHospitalWardOutput;
  deleteJoinRequestForCurrentUser: CommonResponse;
  deletePatient: CommonResponse;
  denyCreateHospitalRequest: CommonResponse;
  /** 요청된 가입신청을 거절합니다. ADMIN 전용 */
  denyJoinRequest: CommonResponse;
  /** 이메일과 비밀번호로 로그인합니다. */
  login: LoginOutput;
  /** 현재 로그인된 사용자를 로그아웃합니다. */
  logout: LogoutOutput;
  removeEmployeeCommittee: EmployeeOutput;
  removeEmployeePart: EmployeeOutput;
  removeEmployeeRoom: EmployeeOutput;
  requestCreateHospital: RequestCreateHospitalOutput;
  requestJoinHospital: JoinHospitalRequestOutput;
  setEmployeeDuty: EmployeeOutput;
  setEmployeePosition: EmployeeOutput;
  setEmployeeWard: EmployeeOutput;
  /** 회원 가입을 진행합니다. */
  signup: GetUserOutput;
  superOnlyUpdateManyUserStatus: CommonResponse;
  superOnlyUpdateUserStatus: CommonResponse;
  unlinkManyUserForAdmin: CommonResponse;
  /** 병원에서 직원을 제외합니다. ADMIN 전용 */
  unlinkStaff: CommonResponse;
  unlinkUserForAdmin: CommonResponse;
  updateAdmitFee: AdmitFeeResponse;
  updateEmployee: EmployeeOutput;
  /** 병원 위원회를 수정합니다. */
  updateHospitalCommittee: UpdateHospitalCommitteeOutput;
  /** 병원 직무를 수정합니다. */
  updateHospitalDuty: UpdateHospitalDutyOutput;
  /** 병원 파트를 수정합니다. */
  updateHospitalPart: UpdateHospitalPositionOutput;
  /** 병원 직책을 수정합니다. */
  updateHospitalPosition: UpdateHospitalPositionOutput;
  /** 병원 병실을 수정합니다. */
  updateHospitalRoom: UpdateHospitalRoomOutput;
  /** 병원 병동을 수정합니다. */
  updateHospitalWard: UpdateHospitalWardOutput;
  updateManyUserStatusForAdmin: CommonResponse;
  updatePatient: PatientResponse;
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


export type MutationAddEmployeeCommitteeArgs = {
  committeeId: Scalars['Int']['input'];
  employeeId: Scalars['Int']['input'];
};


export type MutationAddEmployeePartArgs = {
  employeeId: Scalars['Int']['input'];
  partId: Scalars['Int']['input'];
};


export type MutationAddEmployeeRoomArgs = {
  employeeId: Scalars['Int']['input'];
  roomId: Scalars['Int']['input'];
};


export type MutationBulkCreatePatientsArgs = {
  input: BulkCreatePatientsInput;
};


export type MutationBulkCreatePatientsFromFileArgs = {
  input: BulkCreatePatientsFromFileInput;
};


export type MutationCreateAdmitFeeArgs = {
  input: CreateAdmitFeeInputDto;
};


export type MutationCreateEmployeeArgs = {
  input: EmployeeCreateInput;
};


export type MutationCreateHospitalCommitteeArgs = {
  hospitalId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateHospitalDefaultDataArgs = {
  hospitalId: Scalars['Int']['input'];
};


export type MutationCreateHospitalDutyArgs = {
  hospitalId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateHospitalPartArgs = {
  hospitalId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateHospitalPositionArgs = {
  hospitalId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateHospitalRoomArgs = {
  hospitalId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  wardId: Scalars['Int']['input'];
};


export type MutationCreateHospitalWardArgs = {
  hospitalId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateMyHospitalCommitteeArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateMyHospitalDutyArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateMyHospitalPartArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateMyHospitalPositionArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateMyHospitalRoomArgs = {
  name: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  wardId: Scalars['Int']['input'];
};


export type MutationCreateMyHospitalWardArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreatePatientArgs = {
  input: CreatePatientInput;
};


export type MutationDeleteAdmitFeeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEmployeeArgs = {
  employeeId: Scalars['Int']['input'];
};


export type MutationDeleteHospitalCommitteeArgs = {
  committeeId: Scalars['Int']['input'];
};


export type MutationDeleteHospitalDutyArgs = {
  dutyId: Scalars['Int']['input'];
};


export type MutationDeleteHospitalPartArgs = {
  partId: Scalars['Int']['input'];
};


export type MutationDeleteHospitalPositionArgs = {
  positionId: Scalars['Int']['input'];
};


export type MutationDeleteHospitalRoomArgs = {
  roomId: Scalars['Int']['input'];
};


export type MutationDeleteHospitalWardArgs = {
  wardId: Scalars['Int']['input'];
};


export type MutationDeletePatientArgs = {
  patientId: Scalars['Int']['input'];
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


export type MutationRemoveEmployeeCommitteeArgs = {
  committeeId: Scalars['Int']['input'];
  employeeId: Scalars['Int']['input'];
};


export type MutationRemoveEmployeePartArgs = {
  employeeId: Scalars['Int']['input'];
  partId: Scalars['Int']['input'];
};


export type MutationRemoveEmployeeRoomArgs = {
  employeeId: Scalars['Int']['input'];
  roomId: Scalars['Int']['input'];
};


export type MutationRequestCreateHospitalArgs = {
  ykiho: Scalars['String']['input'];
};


export type MutationRequestJoinHospitalArgs = {
  hospitalId: Scalars['Int']['input'];
  message?: Scalars['String']['input'];
};


export type MutationSetEmployeeDutyArgs = {
  dutyId?: InputMaybe<Scalars['Int']['input']>;
  employeeId: Scalars['Int']['input'];
};


export type MutationSetEmployeePositionArgs = {
  employeeId: Scalars['Int']['input'];
  positionId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationSetEmployeeWardArgs = {
  employeeId: Scalars['Int']['input'];
  wardId?: InputMaybe<Scalars['Int']['input']>;
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


export type MutationUpdateAdmitFeeArgs = {
  id: Scalars['Int']['input'];
  input: UpdateAdmitFeeInputDto;
};


export type MutationUpdateEmployeeArgs = {
  employeeId: Scalars['Int']['input'];
  input: EmployeeUpdateInput;
};


export type MutationUpdateHospitalCommitteeArgs = {
  committeeId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateHospitalDutyArgs = {
  dutyId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateHospitalPartArgs = {
  name: Scalars['String']['input'];
  partId: Scalars['Int']['input'];
};


export type MutationUpdateHospitalPositionArgs = {
  name: Scalars['String']['input'];
  positionId: Scalars['Int']['input'];
};


export type MutationUpdateHospitalRoomArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  roomId: Scalars['Int']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  wardId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateHospitalWardArgs = {
  name: Scalars['String']['input'];
  wardId: Scalars['Int']['input'];
};


export type MutationUpdateManyUserStatusForAdminArgs = {
  input: UpdateManyUserStatusInput;
};


export type MutationUpdatePatientArgs = {
  input: UpdatePatientInput;
  patientId: Scalars['Int']['input'];
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

export type PaginatedAdmitFeeResponse = {
  __typename?: 'PaginatedAdmitFeeResponse';
  data?: Maybe<Array<AdmitFee>>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  pageInfo?: Maybe<PageInfo>;
  success: Scalars['Boolean']['output'];
};

export type PaginatedPatientResponse = {
  __typename?: 'PaginatedPatientResponse';
  data?: Maybe<Array<Patient>>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  pageInfo?: Maybe<PageInfo>;
  success: Scalars['Boolean']['output'];
};

export type Patient = {
  __typename?: 'Patient';
  admitFees: Array<AdmitFee>;
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  chartId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  enterDate?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<PatientGender>;
  hospital?: Maybe<HospitalType>;
  hospitalId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  leaveDate?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  room?: Maybe<HospitalRoomType>;
  roomId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  ward?: Maybe<HospitalWardType>;
  wardId: Scalars['Int']['output'];
};

export enum PatientFileType {
  Csv = 'CSV',
  Excel = 'EXCEL'
}

export enum PatientGender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type PatientResponse = {
  __typename?: 'PatientResponse';
  data?: Maybe<Patient>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** ADMIN 유저 전용. 병원에 가입 신청 목록을 가져옵니다. Pagination 가능. */
  adminOnlyRetrieveJoinRequest: RetrieveJoinRequestOutput;
  getAdmitFee: AdmitFeeResponse;
  getEmployee: EmployeeOutput;
  getHospitalAdmissionReportOnDateRange: Array<HospitalAdmissionReport>;
  getHospitalByYkiho: GetHospitalInfoByYkihoOutput;
  getHospitalInfoByYkiho: BaseHospitalInfoOutput;
  getHospitalPatientCountOnDate: HospitalPatientCountResponse;
  getJoinRequestByCurrentUser: JoinHospitalRequestOutput;
  getPatient: PatientResponse;
  getRegisterRequest: RequestCreateHospitalOutput;
  getRoomAdmissionReportOnDateRange: Array<RoomAdmissionReport>;
  getRoomPatientCountOnDate: RoomPatientCount;
  /** 테스트용 */
  getUserById: UserType;
  getWardAdmissionReportOnDateRange: Array<WardAdmissionReport>;
  getWardPatientCountOnDate: WardPatientCount;
  /** 현재 사용자의 프로필 데이터를 가져옵니다. 로그인 토큰 필수. */
  me: GetUserOutput;
  retrieveAdmitFeeList: PaginatedAdmitFeeResponse;
  retrieveCreateHospitalRequest: RetrieveCreateHospitalListOutput;
  retrieveEmployees: EmployeesOutput;
  /** 병원 위원회 목록을 조회합니다. */
  retrieveHospitalCommittees: RetrieveHospitalCommitteesOutput;
  /** 병원 직무 목록을 조회합니다. */
  retrieveHospitalDuties: RetrieveHospitalDutiesOutput;
  retrieveHospitalList: RetrieveHospitalListOutput;
  /** 병원 파트 목록을 조회합니다. */
  retrieveHospitalParts: RetrieveHospitalPositionsOutput;
  /** 병원 직책 목록을 조회합니다. */
  retrieveHospitalPositions: RetrieveHospitalPositionsOutput;
  /** 병원 병실 목록을 조회합니다. */
  retrieveHospitalRooms: RetrieveHospitalRoomsOutput;
  retrieveHospitalUsersForAdmin: RetrieveUserOutput;
  /** 병원 병동 목록을 조회합니다. */
  retrieveHospitalWards: RetrieveHospitalWardsOutput;
  /** 나의 병원 위원회 목록을 조회합니다. (로그인 기반) */
  retrieveMyHospitalCommittees: RetrieveHospitalCommitteesOutput;
  /** 나의 병원 직무 목록을 조회합니다. (로그인 기반) */
  retrieveMyHospitalDuties: RetrieveHospitalDutiesOutput;
  retrieveMyHospitalEmployees: EmployeesOutput;
  /** 나의 병원 파트 목록을 조회합니다. (로그인 기반) */
  retrieveMyHospitalParts: RetrieveHospitalPositionsOutput;
  /** 나의 병원 직책 목록을 조회합니다. (로그인 기반) */
  retrieveMyHospitalPositions: RetrieveHospitalPositionsOutput;
  /** 나의 병원 병실 목록을 조회합니다. (로그인 기반) */
  retrieveMyHospitalRooms: RetrieveHospitalRoomsOutput;
  /** 나의 병원 병동 목록을 조회합니다. (로그인 기반) */
  retrieveMyHospitalWards: RetrieveHospitalWardsOutput;
  retrievePatientList: PaginatedPatientResponse;
  retrievePatientsOnThatDate: PaginatedPatientResponse;
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


export type QueryGetAdmitFeeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetEmployeeArgs = {
  employeeId: Scalars['Int']['input'];
};


export type QueryGetHospitalAdmissionReportOnDateRangeArgs = {
  endDate: Scalars['DateTime']['input'];
  hospitalId: Scalars['Int']['input'];
  startDate: Scalars['DateTime']['input'];
};


export type QueryGetHospitalByYkihoArgs = {
  ykiho: Scalars['String']['input'];
};


export type QueryGetHospitalInfoByYkihoArgs = {
  ykiho: Scalars['String']['input'];
};


export type QueryGetHospitalPatientCountOnDateArgs = {
  date: Scalars['DateTime']['input'];
  hospitalId: Scalars['Int']['input'];
};


export type QueryGetPatientArgs = {
  patientId: Scalars['Int']['input'];
};


export type QueryGetRegisterRequestArgs = {
  ykiho: Scalars['String']['input'];
};


export type QueryGetRoomAdmissionReportOnDateRangeArgs = {
  endDate: Scalars['DateTime']['input'];
  roomId: Scalars['Int']['input'];
  startDate: Scalars['DateTime']['input'];
};


export type QueryGetRoomPatientCountOnDateArgs = {
  date: Scalars['DateTime']['input'];
  roomId: Scalars['Int']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetWardAdmissionReportOnDateRangeArgs = {
  endDate: Scalars['DateTime']['input'];
  startDate: Scalars['DateTime']['input'];
  wardId: Scalars['Int']['input'];
};


export type QueryGetWardPatientCountOnDateArgs = {
  date: Scalars['DateTime']['input'];
  wardId: Scalars['Int']['input'];
};


export type QueryRetrieveAdmitFeeListArgs = {
  hospitalId?: InputMaybe<Scalars['Int']['input']>;
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  patientId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRetrieveCreateHospitalRequestArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryRetrieveEmployeesArgs = {
  hospitalId: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryRetrieveHospitalCommitteesArgs = {
  hospitalId: Scalars['Int']['input'];
};


export type QueryRetrieveHospitalDutiesArgs = {
  hospitalId: Scalars['Int']['input'];
};


export type QueryRetrieveHospitalListArgs = {
  hospitalName: Scalars['String']['input'];
};


export type QueryRetrieveHospitalPartsArgs = {
  hospitalId: Scalars['Int']['input'];
};


export type QueryRetrieveHospitalPositionsArgs = {
  hospitalId: Scalars['Int']['input'];
};


export type QueryRetrieveHospitalRoomsArgs = {
  hospitalId: Scalars['Int']['input'];
  wardId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRetrieveHospitalUsersForAdminArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  role?: InputMaybe<UserRole>;
};


export type QueryRetrieveHospitalWardsArgs = {
  hospitalId: Scalars['Int']['input'];
};


export type QueryRetrieveMyHospitalEmployeesArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryRetrieveMyHospitalRoomsArgs = {
  wardId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRetrievePatientListArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  hospitalId: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  roomId?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  wardId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRetrievePatientsOnThatDateArgs = {
  date: Scalars['DateTime']['input'];
  hospitalId: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  roomId?: InputMaybe<Scalars['Int']['input']>;
  wardId?: InputMaybe<Scalars['Int']['input']>;
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

export type RetrieveHospitalCommitteesOutput = {
  __typename?: 'RetrieveHospitalCommitteesOutput';
  data?: Maybe<Array<HospitalCommitteeType>>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type RetrieveHospitalDutiesOutput = {
  __typename?: 'RetrieveHospitalDutiesOutput';
  data?: Maybe<Array<HospitalDutyType>>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
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

export type RetrieveHospitalPositionsOutput = {
  __typename?: 'RetrieveHospitalPositionsOutput';
  data?: Maybe<Array<HospitalPositionType>>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type RetrieveHospitalRoomsOutput = {
  __typename?: 'RetrieveHospitalRoomsOutput';
  data?: Maybe<Array<HospitalRoomType>>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type RetrieveHospitalWardsOutput = {
  __typename?: 'RetrieveHospitalWardsOutput';
  data?: Maybe<Array<HospitalWardType>>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
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

export type RoomAdmissionReport = {
  __typename?: 'RoomAdmissionReport';
  currentCount: Scalars['Int']['output'];
  date: Scalars['DateTime']['output'];
  enterCount: Scalars['Int']['output'];
  leaveCount: Scalars['Int']['output'];
  patients?: Maybe<Array<Patient>>;
  roomId: Scalars['Int']['output'];
  roomInfo: HospitalRoomType;
  totalCount: Scalars['Int']['output'];
};

export type RoomPatientCount = {
  __typename?: 'RoomPatientCount';
  date: Scalars['DateTime']['output'];
  patients?: Maybe<Array<Patient>>;
  roomId: Scalars['Int']['output'];
  roomInfo: HospitalRoomType;
  totalCount: Scalars['Int']['output'];
};

export type TokenOutput = {
  __typename?: 'TokenOutput';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type UpdateAdmitFeeInputDto = {
  hospitalId?: InputMaybe<Scalars['Int']['input']>;
  insuranceFee?: InputMaybe<Scalars['Float']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
  nonInsuranceFee?: InputMaybe<Scalars['Float']['input']>;
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  patientId?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<AdmitFeePaymentMethod>;
  selfFee?: InputMaybe<Scalars['Float']['input']>;
  state?: InputMaybe<AdmitFeeState>;
};

export type UpdateHospitalCommitteeOutput = {
  __typename?: 'UpdateHospitalCommitteeOutput';
  data?: Maybe<HospitalCommitteeType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateHospitalDutyOutput = {
  __typename?: 'UpdateHospitalDutyOutput';
  data?: Maybe<HospitalDutyType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateHospitalPositionOutput = {
  __typename?: 'UpdateHospitalPositionOutput';
  data?: Maybe<HospitalPositionType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateHospitalRoomOutput = {
  __typename?: 'UpdateHospitalRoomOutput';
  data?: Maybe<HospitalRoomType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateHospitalWardOutput = {
  __typename?: 'UpdateHospitalWardOutput';
  data?: Maybe<HospitalWardType>;
  errors?: Maybe<Array<GraphQlError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateManyUserStatusInput = {
  users: Array<UpdateUserStatusInput>;
};

export type UpdatePatientInput = {
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  chartId?: InputMaybe<Scalars['Int']['input']>;
  enterDate?: InputMaybe<Scalars['DateTime']['input']>;
  gender?: InputMaybe<PatientGender>;
  hospitalId?: InputMaybe<Scalars['Int']['input']>;
  leaveDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roomId?: InputMaybe<Scalars['Int']['input']>;
  wardId?: InputMaybe<Scalars['Int']['input']>;
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

export type WardAdmissionReport = {
  __typename?: 'WardAdmissionReport';
  currentCount: Scalars['Int']['output'];
  date: Scalars['DateTime']['output'];
  enterCount: Scalars['Int']['output'];
  leaveCount: Scalars['Int']['output'];
  patients?: Maybe<Array<Patient>>;
  room?: Maybe<Array<RoomAdmissionReport>>;
  totalCount: Scalars['Int']['output'];
  wardId: Scalars['Int']['output'];
  wardInfo: HospitalWardType;
};

export type WardPatientCount = {
  __typename?: 'WardPatientCount';
  date: Scalars['DateTime']['output'];
  patients?: Maybe<Array<Patient>>;
  room?: Maybe<Array<RoomPatientCount>>;
  roomPatientCounts?: Maybe<Array<RoomPatientCount>>;
  totalCount: Scalars['Int']['output'];
  wardId: Scalars['Int']['output'];
  wardInfo: HospitalWardType;
};

export type CreateEmployeeMutationVariables = Exact<{
  input: EmployeeCreateInput;
}>;


export type CreateEmployeeMutation = { __typename?: 'Mutation', createEmployee: { __typename?: 'EmployeeOutput', success: boolean, message?: string | null, data?: { __typename?: 'EmployeeType', id: number } | null } };

export type GetEmployeeQueryVariables = Exact<{
  employeeId: Scalars['Int']['input'];
}>;


export type GetEmployeeQuery = { __typename?: 'Query', getEmployee: { __typename?: 'EmployeeOutput', success: boolean, message?: string | null, data?: { __typename?: 'EmployeeType', id: number, name: string, createdAt: any, updatedAt: any, enterDate?: any | null, leaveDate?: any | null, state: EmployeeState, birthDate?: any | null, cellPhone?: string | null, position?: { __typename?: 'HospitalPositionType', id: number, name: string } | null, duty?: { __typename?: 'HospitalDutyType', id: number, name: string } | null, ward?: { __typename?: 'HospitalWardType', id: number, name: string } | null, committees?: Array<{ __typename?: 'HospitalCommitteeType', id: number, name: string }> | null, rooms?: Array<{ __typename?: 'HospitalRoomType', id: number, name: string }> | null, parts?: Array<{ __typename?: 'HospitalPartType', id: number, name: string }> | null } | null } };

export type RetrieveMyHospitalEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type RetrieveMyHospitalEmployeesQuery = { __typename?: 'Query', retrieveMyHospitalEmployees: { __typename?: 'EmployeesOutput', success: boolean, message?: string | null, data?: Array<{ __typename?: 'EmployeeType', id: number, name: string, state: EmployeeState, enterDate?: any | null, leaveDate?: any | null, cellPhone?: string | null, birthDate?: any | null, position?: { __typename?: 'HospitalPositionType', id: number, name: string } | null, duty?: { __typename?: 'HospitalDutyType', id: number, name: string } | null }> | null } };

export type UpdateEmployeeMutationVariables = Exact<{
  employeeId: Scalars['Int']['input'];
  input: EmployeeUpdateInput;
}>;


export type UpdateEmployeeMutation = { __typename?: 'Mutation', updateEmployee: { __typename?: 'EmployeeOutput', success: boolean, message?: string | null } };

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


export type RetrieveCreateHospitalRequestQuery = { __typename?: 'Query', retrieveCreateHospitalRequest: { __typename?: 'RetrieveCreateHospitalListOutput', success: boolean, message?: string | null, pageInfo?: { __typename?: 'PageInfo', currentPage: number, hasNextPage: boolean, hasPreviousPage: boolean, total?: number | null, totalPages: number } | null, data?: Array<{ __typename?: 'HospitalRegisterRequestType', id: number, userId: number, ykiho: string, state: CommonState }> | null } };

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


export type RequestCreateHospitalMutation = { __typename?: 'Mutation', requestCreateHospital: { __typename?: 'RequestCreateHospitalOutput', success: boolean, message?: string | null, data?: { __typename?: 'HospitalRegisterRequestType', id: number, ykiho: string, state: CommonState } | null } };

export type GetRequestHospitalQueryVariables = Exact<{
  ykiho: Scalars['String']['input'];
}>;


export type GetRequestHospitalQuery = { __typename?: 'Query', getRegisterRequest: { __typename?: 'RequestCreateHospitalOutput', success: boolean, message?: string | null, data?: { __typename?: 'HospitalRegisterRequestType', id: number, ykiho: string, state: CommonState } | null } };

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


export type GetHospitalByYkihoQuery = { __typename?: 'Query', getHospitalByYkiho: { __typename?: 'GetHospitalInfoByYkihoOutput', success: boolean, message?: string | null, data?: { __typename?: 'HospitalType', id: number, name: string, located?: string | null } | null } };

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

export type RetrieveMyHospitalDutiesQueryVariables = Exact<{ [key: string]: never; }>;


export type RetrieveMyHospitalDutiesQuery = { __typename?: 'Query', retrieveMyHospitalDuties: { __typename?: 'RetrieveHospitalDutiesOutput', success: boolean, message?: string | null, data?: Array<{ __typename?: 'HospitalDutyType', id: number, name: string }> | null } };

export type RetrieveMyHospitalPositionsQueryVariables = Exact<{ [key: string]: never; }>;


export type RetrieveMyHospitalPositionsQuery = { __typename?: 'Query', retrieveMyHospitalPositions: { __typename?: 'RetrieveHospitalPositionsOutput', success: boolean, message?: string | null, data?: Array<{ __typename?: 'HospitalPositionType', id: number, name: string }> | null } };

export type CreateMyHospitalPositionMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateMyHospitalPositionMutation = { __typename?: 'Mutation', createMyHospitalPosition: { __typename?: 'CreateHospitalPositionOutput', success: boolean, message?: string | null } };

export type UpdateHospitalPositionMutationVariables = Exact<{
  positionId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateHospitalPositionMutation = { __typename?: 'Mutation', updateHospitalPosition: { __typename?: 'UpdateHospitalPositionOutput', success: boolean, message?: string | null } };

export type DeleteHospitalPositionMutationVariables = Exact<{
  positionId: Scalars['Int']['input'];
}>;


export type DeleteHospitalPositionMutation = { __typename?: 'Mutation', deleteHospitalPosition: { __typename?: 'DeleteHospitalPositionOutput', success: boolean, message?: string | null } };

export type RetrieveMyHospitalPartsQueryVariables = Exact<{ [key: string]: never; }>;


export type RetrieveMyHospitalPartsQuery = { __typename?: 'Query', retrieveMyHospitalParts: { __typename?: 'RetrieveHospitalPositionsOutput', success: boolean, message?: string | null, data?: Array<{ __typename?: 'HospitalPositionType', id: number, name: string }> | null } };

export type RetrieveMyHospitalWardsQueryVariables = Exact<{ [key: string]: never; }>;


export type RetrieveMyHospitalWardsQuery = { __typename?: 'Query', retrieveMyHospitalWards: { __typename?: 'RetrieveHospitalWardsOutput', success: boolean, message?: string | null, data?: Array<{ __typename?: 'HospitalWardType', id: number, name: string }> | null } };

export type RetrieveMyHospitalCommitteesQueryVariables = Exact<{ [key: string]: never; }>;


export type RetrieveMyHospitalCommitteesQuery = { __typename?: 'Query', retrieveMyHospitalCommittees: { __typename?: 'RetrieveHospitalCommitteesOutput', success: boolean, message?: string | null, data?: Array<{ __typename?: 'HospitalCommitteeType', id: number, name: string }> | null } };

export type CreateMyHospitalPartMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateMyHospitalPartMutation = { __typename?: 'Mutation', createMyHospitalPart: { __typename?: 'CreateHospitalPositionOutput', success: boolean, message?: string | null, data?: { __typename?: 'HospitalPositionType', id: number, name: string } | null } };

export type UpdateHospitalPartMutationVariables = Exact<{
  partId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateHospitalPartMutation = { __typename?: 'Mutation', updateHospitalPart: { __typename?: 'UpdateHospitalPositionOutput', success: boolean, message?: string | null, data?: { __typename?: 'HospitalPositionType', id: number, name: string } | null } };

export type DeleteHospitalPartMutationVariables = Exact<{
  partId: Scalars['Int']['input'];
}>;


export type DeleteHospitalPartMutation = { __typename?: 'Mutation', deleteHospitalPart: { __typename?: 'DeleteHospitalPositionOutput', success: boolean, message?: string | null } };

export type CreateMyHospitalWardMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateMyHospitalWardMutation = { __typename?: 'Mutation', createMyHospitalWard: { __typename?: 'CreateHospitalWardOutput', success: boolean, message?: string | null } };

export type UpdateHospitalWardMutationVariables = Exact<{
  wardId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateHospitalWardMutation = { __typename?: 'Mutation', updateHospitalWard: { __typename?: 'UpdateHospitalWardOutput', success: boolean, message?: string | null } };

export type DeleteHospitalWardMutationVariables = Exact<{
  wardId: Scalars['Int']['input'];
}>;


export type DeleteHospitalWardMutation = { __typename?: 'Mutation', deleteHospitalWard: { __typename?: 'DeleteHospitalWardOutput', success: boolean, message?: string | null } };

export type CreateMyHospitalCommitteeMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateMyHospitalCommitteeMutation = { __typename?: 'Mutation', createMyHospitalCommittee: { __typename?: 'CreateHospitalCommitteeOutput', success: boolean, message?: string | null } };

export type UpdateHospitalCommitteeMutationVariables = Exact<{
  committeeId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateHospitalCommitteeMutation = { __typename?: 'Mutation', updateHospitalCommittee: { __typename?: 'UpdateHospitalCommitteeOutput', success: boolean, message?: string | null } };

export type DeleteHospitalCommitteeMutationVariables = Exact<{
  committeeId: Scalars['Int']['input'];
}>;


export type DeleteHospitalCommitteeMutation = { __typename?: 'Mutation', deleteHospitalCommittee: { __typename?: 'DeleteHospitalCommitteeOutput', success: boolean, message?: string | null } };

export type RetrievePatientListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  hospitalId: Scalars['Int']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  wardId?: InputMaybe<Scalars['Int']['input']>;
  roomId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RetrievePatientListQuery = { __typename?: 'Query', retrievePatientList: { __typename?: 'PaginatedPatientResponse', success: boolean, message?: string | null, pageInfo?: { __typename?: 'PageInfo', currentPage: number, hasNextPage: boolean, hasPreviousPage: boolean, total?: number | null, totalPages: number } | null, data?: Array<{ __typename?: 'Patient', id: number, name: string, chartId: number, gender?: PatientGender | null, roomId: number, wardId: number, enterDate?: any | null, leaveDate?: any | null }> | null } };

export type RetrievePatientsOnThatDateQueryVariables = Exact<{
  date: Scalars['DateTime']['input'];
  hospitalId: Scalars['Int']['input'];
  wardId?: InputMaybe<Scalars['Int']['input']>;
  roomId?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RetrievePatientsOnThatDateQuery = { __typename?: 'Query', retrievePatientsOnThatDate: { __typename?: 'PaginatedPatientResponse', success: boolean, message?: string | null, data?: Array<{ __typename?: 'Patient', id: number, name: string, chartId: number, birthDate?: any | null, gender?: PatientGender | null, roomId: number, wardId: number, enterDate?: any | null, leaveDate?: any | null }> | null } };

export type GetHospitalPatientCountOnDateQueryVariables = Exact<{
  date: Scalars['DateTime']['input'];
  hospitalId: Scalars['Int']['input'];
}>;


export type GetHospitalPatientCountOnDateQuery = { __typename?: 'Query', getHospitalPatientCountOnDate: { __typename?: 'HospitalPatientCountResponse', success: boolean, message?: string | null, data?: { __typename?: 'HospitalPatientCount', totalCount: number, date: any, hospitalId: number, ward?: Array<{ __typename?: 'WardPatientCount', wardId: number, totalCount: number, wardInfo: { __typename?: 'HospitalWardType', name: string }, room?: Array<{ __typename?: 'RoomPatientCount', totalCount: number, roomId: number, roomInfo: { __typename?: 'HospitalRoomType', name: string } }> | null }> | null } | null } };

export type RetrieveWardPatientListQueryVariables = Exact<{
  wardId: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  hospitalId: Scalars['Int']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type RetrieveWardPatientListQuery = { __typename?: 'Query', retrievePatientList: { __typename?: 'PaginatedPatientResponse', success: boolean, message?: string | null, pageInfo?: { __typename?: 'PageInfo', currentPage: number, hasNextPage: boolean, hasPreviousPage: boolean, total?: number | null, totalPages: number } | null, data?: Array<{ __typename?: 'Patient', id: number, name: string, gender?: PatientGender | null, roomId: number, chartId: number, wardId: number, enterDate?: any | null, leaveDate?: any | null }> | null } };

export type RetrieveRoomPatientListQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  hospitalId: Scalars['Int']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type RetrieveRoomPatientListQuery = { __typename?: 'Query', retrievePatientList: { __typename?: 'PaginatedPatientResponse', success: boolean, message?: string | null, pageInfo?: { __typename?: 'PageInfo', currentPage: number, hasNextPage: boolean, hasPreviousPage: boolean, total?: number | null, totalPages: number } | null, data?: Array<{ __typename?: 'Patient', id: number, name: string, gender?: PatientGender | null, chartId: number, roomId: number, wardId: number, enterDate?: any | null, leaveDate?: any | null }> | null } };

export type CreatePatientMutationVariables = Exact<{
  input: CreatePatientInput;
}>;


export type CreatePatientMutation = { __typename?: 'Mutation', createPatient: { __typename?: 'PatientResponse', success: boolean, message?: string | null } };

export type BulkCreatePatientsFromFileMutationVariables = Exact<{
  input: BulkCreatePatientsFromFileInput;
}>;


export type BulkCreatePatientsFromFileMutation = { __typename?: 'Mutation', bulkCreatePatientsFromFile: { __typename?: 'BulkCreatePatientsResponse', success: boolean, message?: string | null, strategy: DuplicateHandlingStrategy, totalCount: number, createdCount: number, skippedCount: number, overriddenCount: number, failedCount: number } };

export type BulkCreatePatientsMutationVariables = Exact<{
  input: BulkCreatePatientsInput;
}>;


export type BulkCreatePatientsMutation = { __typename?: 'Mutation', bulkCreatePatients: { __typename?: 'BulkCreatePatientsResponse', success: boolean, message?: string | null, strategy: DuplicateHandlingStrategy, totalCount: number, createdCount: number, skippedCount: number, overriddenCount: number, failedCount: number } };

export type UpdatePatientMutationVariables = Exact<{
  patientId: Scalars['Int']['input'];
  input: UpdatePatientInput;
}>;


export type UpdatePatientMutation = { __typename?: 'Mutation', updatePatient: { __typename?: 'PatientResponse', success: boolean, message?: string | null } };

export type DeletePatientMutationVariables = Exact<{
  patientId: Scalars['Int']['input'];
}>;


export type DeletePatientMutation = { __typename?: 'Mutation', deletePatient: { __typename?: 'CommonResponse', success: boolean, message?: string | null } };

export type GetPatientQueryVariables = Exact<{
  patientId: Scalars['Int']['input'];
}>;


export type GetPatientQuery = { __typename?: 'Query', getPatient: { __typename?: 'PatientResponse', success: boolean, message?: string | null, data?: { __typename?: 'Patient', id: number, name: string, chartId: number, gender?: PatientGender | null, birthDate?: any | null, roomId: number, wardId: number, enterDate?: any | null, leaveDate?: any | null } | null } };

export type RetrieveMyHospitalWardsAndRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type RetrieveMyHospitalWardsAndRoomsQuery = { __typename?: 'Query', retrieveMyHospitalWards: { __typename?: 'RetrieveHospitalWardsOutput', success: boolean, message?: string | null, data?: Array<{ __typename?: 'HospitalWardType', id: number, name: string, rooms?: Array<{ __typename?: 'HospitalRoomType', id: number, name: string, size?: number | null }> | null }> | null } };

export type CreateMyHospitalRoomMutationVariables = Exact<{
  wardId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateMyHospitalRoomMutation = { __typename?: 'Mutation', createMyHospitalRoom: { __typename?: 'CreateHospitalRoomOutput', success: boolean, message?: string | null, data?: { __typename?: 'HospitalRoomType', id: number, name: string, size?: number | null } | null } };

export type UpdateHospitalRoomMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  wardId?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateHospitalRoomMutation = { __typename?: 'Mutation', updateHospitalRoom: { __typename?: 'UpdateHospitalRoomOutput', success: boolean, message?: string | null, data?: { __typename?: 'HospitalRoomType', id: number, name: string, size?: number | null } | null } };

export type DeleteHospitalRoomMutationVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type DeleteHospitalRoomMutation = { __typename?: 'Mutation', deleteHospitalRoom: { __typename?: 'DeleteHospitalRoomOutput', success: boolean, message?: string | null } };

export type GetHospitalAdmissionReportOnDateRangeQueryVariables = Exact<{
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
  hospitalId: Scalars['Int']['input'];
}>;


export type GetHospitalAdmissionReportOnDateRangeQuery = { __typename?: 'Query', getHospitalAdmissionReportOnDateRange: Array<{ __typename?: 'HospitalAdmissionReport', date: any, totalCount: number, currentCount: number, enterCount: number, leaveCount: number, ward?: Array<{ __typename?: 'WardAdmissionReport', date: any, totalCount: number, currentCount: number, enterCount: number, leaveCount: number, wardInfo: { __typename?: 'HospitalWardType', id: number, name: string } }> | null }> };
