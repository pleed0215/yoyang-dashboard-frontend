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

export const RETRIEVE_CREATE_HOSPITAL_REQUEST_QUERY = gql`
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

export const ACCEPT_CREATE_HOSPITAL_REQUEST_MUTATION = gql`
  mutation AcceptCreateHospitalRequest($requestId: Int!) {
    acceptCreateHospitalRequest(requestId: $requestId) {
      success
      message
    }
  }
`;

export const DENY_CREATE_HOSPITAL_REQUEST_MUTATION = gql`
  mutation DenyCreateHospitalRequest($requestId: Int!) {
    denyCreateHospitalRequest(requestId: $requestId) {
      success
      message
    }
  }
`;

export const CREATE_HOSPITAL_REQUEST_MUTATION = gql`
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

export const GET_REQUEST_HOSPITAL_QUERY = gql`
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

export const GET_HOSPITAL_INFO_QUERY = gql`
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

export const RETRIEVE_JOIN_REQUEST_QUERY = gql`
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

export const ACCEPT_JOIN_REQUEST_MUTATION = gql`
  mutation AcceptJoinRequest($requestId: Int!) {
    acceptJoinRequest(requestId: $requestId) {
      success
      message
    }
  }
`;

export const DENY_JOIN_REQUEST_MUTATION = gql`
  mutation DenyJoinRequest($requestId: Int!) {
    denyJoinRequest(requestId: $requestId) {
      success
      message
    }
  }
`;

export const GET_HOSPITAL_BY_YKIHO_QUERY = gql`
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

export const REQUEST_JOIN_HOSPITAL_MUTATION = gql`
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

export const GET_JOIN_REQUEST_BY_CURRENT_USER_QUERY = gql`
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

export const DELETE_JOIN_REQUEST_FOR_CURRENT_USER_MUTATION = gql`
    mutation DeleteJoinRequestForCurrentUser {
      deleteJoinRequestForCurrentUser {
        success
        message
      }
    }
`;

export const RETRIEVE_HOSPITAL_USER_QUERY=gql`
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

export const UPDATE_MANY_USER_STATUS_FOR_ADMIN_MUTATION=gql`
  mutation UpdateManyUserStatusForAdmin($input: UpdateManyUserStatusInput!) {
    updateManyUserStatusForAdmin(input: $input) {
      success
      message
    }
  }
`;

export const UNLINK_MANY_USER_FROM_HOSPITAL_FOR_ADMIN_MUTATION=gql`
  mutation UnlinkManyUserFromHospitalForAdmin($input: ManyUserIdInput!) {
    unlinkManyUserForAdmin(input: $input) {
      success
      message
    }
  }
`;

export const UNLINK_USER_FROM_HOSPITAL_FOR_ADMIN_MUTATION=gql`
  mutation UnlinkUserFromHospitalForAdmin($input: UserIdInput!) {
    unlinkUserForAdmin(input: $input) {
      success
      message
    }
  }
`;

export const RETRIEVE_MY_HOSPITAL_DUTIES_QUERY = gql`
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

export const RETRIEVE_MY_HOSPITAL_POSITIONS_QUERY = gql`
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

export const CREATE_MY_HOSPITAL_POSITION_MUTATION = gql`
  mutation CreateMyHospitalPosition($name: String!) {
    createMyHospitalPosition(name: $name) {
      success
      message
    }
  }
`

export const UPDATE_HOSPITAL_POSITION_MUTATION = gql`
  mutation UpdateHospitalPosition($positionId: Int!, $name: String!) {
    updateHospitalPosition(positionId: $positionId, name: $name) {
      success
      message
    }
  }
`;

export const DELETE_HOSPITAL_POSITION_MUTATION = gql`
  mutation DeleteHospitalPosition($positionId: Int!) {
    deleteHospitalPosition(positionId: $positionId) {
      success
      message
    }
  }
`;

export const RETRIEVE_MY_HOSPITAL_PARTS_QUERY = gql`
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

export const RETRIEVE_MY_HOSPITAL_WARDS_QUERY = gql`
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

export const RETRIEVE_MY_HOSPITAL_COMMITTEES_QUERY = gql`
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

export const CREATE_HOSPITAL_PART_MUTATION = gql`
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

export const UPDATE_HOSPITAL_PART_MUTATION = gql`
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

export const DELETE_HOSPITAL_PART_MUTATION = gql`
  mutation DeleteHospitalPart($partId: Int!) {
    deleteHospitalPart(partId: $partId) {
      success
      message
    }
  }
`;

export const CREATE_MY_HOSPITAL_WARD_MUTATION = gql`
  mutation CreateMyHospitalWard($name: String!) {
    createMyHospitalWard(name: $name) {
      success
      message
    }
  }
`;

export const UPDATE_HOSPITAL_WARD_MUTATION = gql`
  mutation UpdateHospitalWard($wardId: Int!, $name: String!) {
    updateHospitalWard(wardId: $wardId, name: $name) {
      success
      message
    }
  }
`;

export const DELETE_HOSPITAL_WARD_MUTATION = gql`
  mutation DeleteHospitalWard($wardId: Int!) {
    deleteHospitalWard(wardId: $wardId) {
      success
      message
    }
  }
`;

export const CREATE_MY_HOSPITAL_COMMITTEE_MUTATION = gql`
  mutation CreateMyHospitalCommittee($name: String!) {
    createMyHospitalCommittee(name: $name) {
      success
      message
    }
  }
`;

export const UPDATE_HOSPITAL_COMMITTEE_MUTATION = gql`
  mutation UpdateHospitalCommittee($committeeId: Int!, $name: String!) {
    updateHospitalCommittee(committeeId: $committeeId, name: $name) {
      success
      message
    }
  }
`;

export const DELETE_HOSPITAL_COMMITTEE_MUTATION = gql`
  mutation DeleteHospitalCommittee($committeeId: Int!) {
    deleteHospitalCommittee(committeeId: $committeeId) {
      success
      message
    }
  }
`;

export const RETRIEVE_PATIENT_LIST_QUERY = gql`
  query RetrievePatientList($page: Int = 1, $pageSize: Int = 10, $hospitalId: Int!, $startDate: DateTime, $endDate: DateTime) {
    retrievePatientList(page: $page, pageSize: $pageSize, hospitalId: $hospitalId, startDate: $startDate, endDate: $endDate) {
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
        wardId
        enterDate
        leaveDate
      }
    }
  }
`;


export const RETRIEVE_WARD_PATIENT_LIST_QUERY = gql`
  query RetrieveWardPatientList($wardId: Int!, $page: Int = 1, $pageSize: Int = 10, $hospitalId: Int!, $startDate: DateTime, $endDate: DateTime) {
    retrievePatientList(wardId: $wardId, page: $page, pageSize: $pageSize, hospitalId: $hospitalId, startDate: $startDate, endDate: $endDate) {
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
        wardId
        enterDate
        leaveDate
      }
    }
  }
`;


export const RETRIEVE_ROOM_PATIENT_LIST_QUERY = gql`
  query RetrieveRoomPatientList($roomId: Int!, $page: Int = 1, $pageSize: Int = 10, $hospitalId: Int!, $startDate: DateTime, $endDate: DateTime) {
    retrievePatientList(roomId: $roomId, page: $page, pageSize: $pageSize, hospitalId: $hospitalId, startDate: $startDate, endDate: $endDate) {
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

export const CREATE_PATIENT_MUTATION = gql`
  mutation CreatePatient($input: CreatePatientInput!) {
    createPatient(input: $input) {
      success
      message
    }
  }
`;

export const BULK_CREATE_PATIENTS_FROM_FILE_MUTATION = gql`
  mutation BulkCreatePatientsFromFile($input: BulkCreatePatientsFromFileInput!) {
    bulkCreatePatientsFromFile(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_PATIENT_MUTATION = gql`
  mutation UpdatePatient($patientId: Int!, $input: UpdatePatientInput!) { 
    updatePatient(patientId: $patientId, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_PATIENT_MUTATION = gql`
  mutation DeletePatient($patientId: Int!) {
    deletePatient(patientId: $patientId) {
      success
      message
    }
  }
`;

export const GET_PATIENT_DETAIL_QUERY = gql`
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

export const RETRIEVE_MY_HOSPITAL_WARDS_AND_ROOMS_QUERY = gql`
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

export const CREATE_HOSPITAL_ROOM_MUTATION = gql`
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

export const UPDATE_HOSPITAL_ROOM_MUTATION = gql`
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

export const DELETE_HOSPITAL_ROOM_MUTATION = gql`
  mutation DeleteHospitalRoom($roomId: Int!) {
    deleteHospitalRoom(roomId: $roomId) {
      success
      message
    }
  }
`;
