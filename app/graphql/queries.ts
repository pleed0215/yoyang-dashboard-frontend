import {gql} from "@apollo/client";

export const ME_QUERY = gql`
    query Me {
        me {
            success
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