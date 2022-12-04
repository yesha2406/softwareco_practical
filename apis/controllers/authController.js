const AuthService = require('../services/authService');

const AuthController = {};

const signup = _CATCHASYNC(async (req, res, next) => {
    let signupData = await AuthService.signup(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.USER_SIGNUP_SUCCESS, _STATUS.SUCCESS, signupData);
});

const signin = _CATCHASYNC(async (req, res, next) => {
    let siginData = await AuthService.signin(req);
    return _RESPONSE.sendSuccessResponse(res, _MESSAGE.USER_SIGNIN_SUCCESS, _STATUS.SUCCESS, siginData);
});


AuthController.signup = signup;
AuthController.signin = signin;

module.exports = AuthController;