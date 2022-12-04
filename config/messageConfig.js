//  Defined response messages
const messages = {
    SUCCESS: "Success",
    SUCCESS_RESULT: 'Success Result',
    ERROR: "Error",
    NO_DATA_FOUND: "No data found.",
    SOMETHING_WENT_WRONG: "Something went wrong.",
    INTERNAL_SERVER_ERROR: 'Internal Server Error',

    // Auth messages...
    USER_SIGNUP_SUCCESS: "User signup successfully.",
    USER_SIGNIN_SUCCESS: "User signin successfully.",
    ERROR_USER_SIGNUP: "Error in user signup.",
    EMAIL_REQUIRED: "Please enter Email id",
    PASSWORD_REQUIRED: "Please enter password",
    INVALID_CREDENTIALS: "Invalid credentials.",
    UNAUTHORIZED: "Unauthorized",
    PERMISSION_DENIED: "You need permission to access this module.",

    // Role messages...
    ROLE_EXISTS: "Role already exists.",
    SUCCESS_CREATE_ROLE: "New role created successfully.",
    ERROR_CREATE_ROLE: "Failed to create role.",
    ROLE_NOT_FOUND: "Role not found.",
    SUCCESS_UPDATE_ROLE: "Role updated successfully.",
    ERROR_UPDATE_ROLE: "Failed to update Role.",
    SUCCESS_DELETE_ROLE: "Role deleted successfully.",
    ERROR_DELETE_ROLE: "Failed to delete Role.",
    SUCCESS_ROLE_DATA: "Role Data.",
    ACCESS_MODULE_EXISTS: "Access module already exists.",
    ACCESS_MODULE_NOT_EXISTS: "Access module don't exists.",
    SUCCESS_ADD_ACCESS_MODULE: "Add new access module successfully.",
    SUCCESS_REMOVE_ACCESS_MODULE: "Remove access module successfully.",

    // User messages...
    USER_EXISTS: "User already exists.",
    SUCCESS_CREATE_USER: "New user create successfully.",
    ERROR_CREATE_USER: "Failed to create new user.",
    USER_NOT_FOUND: "User not found.",
    SUCCESS_UPDATE_USER: "User data updated successfully.",
    ERROR_UPDATE_USER: "Failed to update user data.",
    SUCCESS_DELETE_USER: "User deleted successfully.",
    ERROR_DELETE_USER: "Failed to delete User.",
    SUCCESS_USER_DATA: "User Data.",
};

module.exports = messages;
