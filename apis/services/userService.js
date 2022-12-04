const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../../schemas/userSchema');
const { hashPassword } = require("../../utils/common/helper");

const UserService = {};

const createUser = async (req) => {
    let body = req.body;
    let options = {};
    options = { email: body.email };
    let isUserExist = await User.findOne(options);
    if (isUserExist) throw new _APIERROR(_MESSAGE.USER_EXISTS, _STATUS.BAD_REQUEST);

    let hashPwd = await hashPassword(body.password);
    if (!hashPwd) throw new _APIERROR(_MESSAGE.SOMETHING_WENT_WRONG, _STATUS.BAD_REQUEST);

    options = {
        first_name: body.first_name,
        last_name: body.last_name,
        age: body.age,
        phone: body.phone,
        gender: body.gender,
        email: body.email,
        password: hashPwd,
        _role: body._role,
    };
    let user = new User(options);
    let newUser = await user.save();
    if (!newUser) throw new _APIERROR(_MESSAGE.ERROR_CREATE_USER, _STATUS.BAD_REQUEST);

    newUser = newUser.toObject();
    delete newUser.password;

    return newUser;
};

const updateUser = async (req) => {
    let userId = req.params.id;
    let body = req.body;
    let options = {};
    let isUserExist = await User.findById(userId);
    if (!isUserExist) throw new _APIERROR(_MESSAGE.USER_NOT_FOUND, _STATUS.BAD_REQUEST);

    let duplicateUser = await User.find({ _id: { $ne: userId }, email: body.email });
    if (duplicateUser.length) throw new _APIERROR(_MESSAGE.USER_EXISTS, _STATUS.BAD_REQUEST);

    let hashPwd = await hashPassword(body.password);
    if (!hashPwd) throw new _APIERROR(_MESSAGE.SOMETHING_WENT_WRONG, _STATUS.BAD_REQUEST);

    options = {
        first_name: body.first_name,
        last_name: body.last_name,
        age: body.age,
        phone: body.phone,
        gender: body.gender,
        email: body.email,
        password: hashPwd,
        _role: body._role,
    };
    let updateUser = await User.findByIdAndUpdate(userId, options, { new: true });
    if (!updateUser) throw new _APIERROR(_MESSAGE.ERROR_UPDATE_USER, _STATUS.BAD_REQUEST);

    updateUser = updateUser.toObject();
    delete updateUser.password;

    return updateUser;
};

const deleteUser = async (req) => {
    let userId = req.params.id;
    let options = {};
    let isUserExist = await User.findById(userId);
    if (!isUserExist) throw new _APIERROR(_MESSAGE.USER_NOT_FOUND, _STATUS.BAD_REQUEST);

    options = { _id: userId };
    let deleteUser = await User.findByIdAndDelete(options);
    if (!deleteUser) throw new _APIERROR(_MESSAGE.ERROR_DELETE_USER, _STATUS.BAD_REQUEST);

    return deleteUser;
};

const getUserById = async (req) => {
    let userId = req.params.id;
    let isUserExist = await User.findById(userId);
    if (!isUserExist) throw new _APIERROR(_MESSAGE.USER_NOT_FOUND, _STATUS.BAD_REQUEST);

    let userData = await User.aggregate([
        {
            '$match': {
                '_id': ObjectId(userId)
            }
        }, {
            '$lookup': {
                'from': 'roles',
                'localField': '_role',
                'foreignField': '_id',
                'as': 'role'
            }
        }, {
            '$unwind': {
                'path': '$role'
            }
        }, {
            '$project': {
                '_id': 1,
                'first_name': 1,
                'last_name': 1,
                'age': 1,
                'phone': 1,
                'gender': 1,
                'email': 1,
                '_role': 1,
                'createdAt': 1,
                'updatedAt': 1,
                'role': 1
            }
        }
    ]);
    userData = userData[0];

    return userData;
}

const getAllUsers = async (req) => {
    let filter = {};

    if (req.query.search) {
        filter.$or = [
            { first_name: { $regex: req.query.search, $options: 'i' } },
            { last_name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
            { gender: { $regex: req.query.search, $options: 'i' } },
        ];
    }

    let users = await User.find(filter, '-password').populate('_role', 'name access_modules');

    return users;
}

const updateAllData = async (req) => {
    let body = req.body;
    await User.updateMany({
        [body.condionalFieldName]: body.condionalFieldValue
    }, {
        [body.updateFieldName]: body.updateFieldValue
    }, { multi: true });

    return;
};

const updateDifferentData = async (req) => {
    let body = req.body;
    let updatedData = [];

    for (let i = 0; i < body.differentData.length; i++) {
        let item = body.differentData[i];
        let isUserExist = await User.findById(item._id);
        if (!isUserExist) throw new _APIERROR(_MESSAGE.USER_NOT_FOUND, _STATUS.BAD_REQUEST);

        let updateUser = await User.findByIdAndUpdate(item._id, item.updateData, { new: true }).populate('_role', 'name access_modules');
        if (!updateUser) throw new _APIERROR(_MESSAGE.ERROR_UPDATE_USER, _STATUS.BAD_REQUEST);

        updateUser = updateUser.toObject();
        delete updateUser.password;
        updatedData.push(updateUser);
    }
    return updatedData;
};


UserService.createUser = createUser;
UserService.updateUser = updateUser;
UserService.deleteUser = deleteUser;
UserService.getUserById = getUserById;
UserService.getAllUsers = getAllUsers;
UserService.updateAllData = updateAllData;
UserService.updateDifferentData = updateDifferentData;

module.exports = UserService;