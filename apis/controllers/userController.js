const UserService = require('../services/userService');

const UserController = {};

const createUser = _CATCHASYNC(async (req, res, next) => {
    const createUser = await UserService.createUser(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_CREATE_USER, _STATUS.SUCCESS, createUser);
});

const updateUser = _CATCHASYNC(async (req, res, next) => {
    const updateUser = await UserService.updateUser(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_UPDATE_USER, _STATUS.SUCCESS, updateUser);
});

const deleteUser = _CATCHASYNC(async (req, res, next) => {
    const deleteUser = await UserService.deleteUser(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_DELETE_USER, _STATUS.SUCCESS, deleteUser);
});

const getUserById = _CATCHASYNC(async (req, res, next) => {
    const getUserById = await UserService.getUserById(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_USER_DATA, _STATUS.SUCCESS, getUserById);
});

const getAllUsers = _CATCHASYNC(async (req, res, next) => {
    const getAllUsers = await UserService.getAllUsers(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_USER_DATA, _STATUS.SUCCESS, getAllUsers);
});

const updateAllData = _CATCHASYNC(async (req, res, next) => {
    const updateAllData = await UserService.updateAllData(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_UPDATE_USER, _STATUS.SUCCESS, {});
});

const updateDifferentData = _CATCHASYNC(async (req, res, next) => {
    const updateDifferentData = await UserService.updateDifferentData(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_UPDATE_USER, _STATUS.SUCCESS, updateDifferentData);
});

UserController.createUser = createUser;
UserController.updateUser = updateUser;
UserController.deleteUser = deleteUser;
UserController.getUserById = getUserById;
UserController.getAllUsers = getAllUsers;
UserController.updateAllData = updateAllData;
UserController.updateDifferentData = updateDifferentData;

module.exports = UserController;