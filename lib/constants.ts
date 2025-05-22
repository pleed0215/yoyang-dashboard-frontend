export const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9]*$/;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 50;
export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 32;
export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 32;
export const PAGE_SIZE = 10;
export const MAX_UPLOAD_FILE_SIZE = 1024 * 1024 * 10;
export const MAX_UPLOAD_FILE_COUNT = 5;