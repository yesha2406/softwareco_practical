const RoleService = require('../services/roleService');

const RoleController = {};

const createRole = _CATCHASYNC(async (req, res, next) => {
    const createRole = await RoleService.createRole(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_CREATE_ROLE, _STATUS.SUCCESS, createRole);
});

const updateRole = _CATCHASYNC(async (req, res, next) => {
    const updateRole = await RoleService.updateRole(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_UPDATE_ROLE, _STATUS.SUCCESS, updateRole);
});

const deleteRole = _CATCHASYNC(async (req, res, next) => {
    const deleteRole = await RoleService.deleteRole(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_DELETE_ROLE, _STATUS.SUCCESS, deleteRole);
});

const getRoleById = _CATCHASYNC(async (req, res, next) => {
    const getRoleById = await RoleService.getRoleById(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_ROLE_DATA, _STATUS.SUCCESS, getRoleById);
});

const getAllRoles = _CATCHASYNC(async (req, res, next) => {
    const getAllRoles = await RoleService.getAllRoles(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_ROLE_DATA, _STATUS.SUCCESS, getAllRoles);
});

const insertAccessModule = _CATCHASYNC(async (req, res, next) => {
    const insertAccessModule = await RoleService.insertAccessModule(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_ROLE_DATA, _STATUS.SUCCESS, insertAccessModule);
});

const removeAccessModule = _CATCHASYNC(async (req, res, next) => {
    const removeAccessModule = await RoleService.removeAccessModule(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.SUCCESS_ROLE_DATA, _STATUS.SUCCESS, removeAccessModule);
});


RoleController.createRole = createRole;
RoleController.updateRole = updateRole;
RoleController.deleteRole = deleteRole;
RoleController.getRoleById = getRoleById;
RoleController.getAllRoles = getAllRoles;
RoleController.insertAccessModule = insertAccessModule;
RoleController.removeAccessModule = removeAccessModule;

module.exports = RoleController;