const User = require('../../schemas/userSchema');
const { hashPassword, comparePassword, generateJwt } = require("../../utils/common/helper");

const AuthService = {};

const signup = async (req) => {
    let body = req.body;
    let options = {};
    options = { email: body.email };
    let isUserExist = await User.findOne(options);
    if (isUserExist) throw new _APIERROR(_MESSAGE.USER_EXISTS, _STATUS.BAD_REQUEST);

    let hashPwd = await hashPassword(body.password);
    if (!hashPwd) throw new _APIERROR(_MESSAGE.SOMETHING_WENT_WRONG, _STATUS.BAD_REQUEST);

    options = {
        /** After signup admin can change the role of the user */
        first_name: body.first_name,
        last_name: body.last_name,
        age: body.age,
        phone: body.phone,
        gender: body.gender,
        email: body.email,
        password: hashPwd,
    };
    let user = new User(options);
    let newUser = await user.save();
    if (!newUser) throw new _APIERROR(_MESSAGE.ERROR_USER_SIGNUP, _STATUS.BAD_REQUEST);

    newUser = newUser.toObject();
    delete newUser.password;

    return newUser;
};

const signin = async (req) => {
    let body = req.body;
    let options = {};

    if (body.email == null || body.email == "") throw new _APIERROR(_MESSAGE.EMAIL_REQUIRED, _STATUS.BAD_REQUEST);

    if (body.password == null || body.password == "") throw new _APIERROR(_MESSAGE.PASSWORD_REQUIRED, _STATUS.BAD_REQUEST);

    options = { email: body.email };
    let isUserExist = await User.findOne(options);
    if (!isUserExist) throw new _APIERROR(_MESSAGE.USER_NOT_FOUND, _STATUS.BAD_REQUEST);

    let validatePwd = await comparePassword(body.password, isUserExist.password);
    if (!validatePwd) throw new ApiError(_MESSAGE.INVALID_CREDENTIALS, _STATUS.BAD_REQUEST);

    let tokenObj = { user_id: isUserExist._id, email: isUserExist.email, name: `${isUserExist.first_name} ${isUserExist.last_name}` };
    let token = await generateJwt(tokenObj, process.env.SECRET, { expiresIn: "1h" });

    isUserExist = {
        ...isUserExist.toObject(),
        token
    };
    delete isUserExist.password;

    return isUserExist;
};


AuthService.signup = signup;
AuthService.signin = signin;

module.exports = AuthService;