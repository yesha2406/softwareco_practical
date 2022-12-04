const ObjectId = require('mongoose').Types.ObjectId;
const Role = require('../../schemas/roleSchema');

const RoleService = {};

const createRole = async (req) => {
    let body = req.body;
    let options = {};
    options = { name: body.name };
    let isRoleExist = await Role.findOne(options);
    if (isRoleExist) throw new _APIERROR(_MESSAGE.ROLE_EXISTS, _STATUS.BAD_REQUEST);

    options = { name: body.name, access_modules: body.access_modules, active: body.active };
    let role = new Role(options);
    let newRole = await role.save();
    if (!newRole) throw new _APIERROR(_MESSAGE.ERROR_CREATE_ROLE, _STATUS.BAD_REQUEST);

    return newRole;
};

const updateRole = async (req) => {
    let roleId = req.params.id;
    let body = req.body;
    let options = {};
    let isRoleExist = await Role.findById(roleId);
    if (!isRoleExist) throw new _APIERROR(_MESSAGE.ROLE_NOT_FOUND, _STATUS.BAD_REQUEST);

    let duplicateRole = await Role.find({ _id: { $ne: roleId }, name: body.name });
    if (duplicateRole.length) throw new _APIERROR(_MESSAGE.ROLE_EXISTS, _STATUS.BAD_REQUEST);

    options = { name: body.name, access_modules: body.access_modules, active: body.active };
    let updateRole = await Role.findByIdAndUpdate(roleId, options, { new: true });
    if (!updateRole) throw new _APIERROR(_MESSAGE.ERROR_UPDATE_ROLE, _STATUS.BAD_REQUEST);

    return updateRole;
};

const deleteRole = async (req) => {
    let roleId = req.params.id;
    let options = {};
    let isRoleExist = await Role.findById(roleId);
    if (!isRoleExist) throw new _APIERROR(_MESSAGE.ROLE_NOT_FOUND, _STATUS.BAD_REQUEST);

    options = { _id: roleId };
    let deleteRole = await Role.findByIdAndDelete(options);
    if (!deleteRole) throw new _APIERROR(_MESSAGE.ERROR_DELETE_ROLE, _STATUS.BAD_REQUEST);

    return deleteRole;
};

const getRoleById = async (req) => {
    let roleId = req.params.id;
    let isRoleExist = await Role.findById(roleId);
    if (!isRoleExist) throw new _APIERROR(_MESSAGE.ROLE_NOT_FOUND, _STATUS.BAD_REQUEST);

    return isRoleExist;
}

const getAllRoles = async (req) => {
    let filter = {};

    if (req.query.search) {
        filter.$or = [
            { name: { $regex: req.query.search, $options: 'i' } }
        ];
    }

    let roles = await Role.find(filter);

    return roles;
}

const insertAccessModule = async (req) => {
    let roleId = req.params.id;
    let isRoleExist = await Role.findById(roleId);
    if (!isRoleExist) throw new _APIERROR(_MESSAGE.ROLE_NOT_FOUND, _STATUS.BAD_REQUEST);

    let duplicateAccessModule = await Role.aggregate([
        {
            '$match': {
                '_id': ObjectId(roleId)
            }
        }, {
            '$project': {
                '_id': 0,
                'isModuleExist': {
                    '$filter': {
                        'input': '$access_modules',
                        'as': 'module',
                        'cond': {
                            '$eq': [
                                '$$module', req.body.module
                            ]
                        }
                    }
                }
            }
        }
    ]);

    if (duplicateAccessModule[0].isModuleExist.length) throw new _APIERROR(_MESSAGE.ACCESS_MODULE_EXISTS, _STATUS.BAD_REQUEST);
    let updatedRole = await Role.findByIdAndUpdate({ _id: roleId }, { $push: { access_modules: req.body.module } }, { new: true });

    return updatedRole;
}

const removeAccessModule = async (req) => {
    let roleId = req.params.id;
    let isRoleExist = await Role.findById(roleId);
    if (!isRoleExist) throw new _APIERROR(_MESSAGE.ROLE_NOT_FOUND, _STATUS.BAD_REQUEST);

    let duplicateAccessModule = await Role.aggregate([
        {
            '$match': {
                '_id': ObjectId(roleId)
            }
        }, {
            '$project': {
                '_id': 0,
                'isModuleExist': {
                    '$filter': {
                        'input': '$access_modules',
                        'as': 'module',
                        'cond': {
                            '$eq': [
                                '$$module', req.body.module
                            ]
                        }
                    }
                }
            }
        }
    ]);

    if (!duplicateAccessModule[0].isModuleExist.length) throw new _APIERROR(_MESSAGE.ACCESS_MODULE_NOT_EXISTS, _STATUS.BAD_REQUEST);
    let updatedRole = await Role.findByIdAndUpdate({ _id: roleId }, { $pull: { access_modules: req.body.module } }, { new: true });

    return updatedRole;
}


RoleService.createRole = createRole;
RoleService.updateRole = updateRole;
RoleService.deleteRole = deleteRole;
RoleService.getRoleById = getRoleById;
RoleService.getAllRoles = getAllRoles;
RoleService.insertAccessModule = insertAccessModule;
RoleService.removeAccessModule = removeAccessModule;

module.exports = RoleService;