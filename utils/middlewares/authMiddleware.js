const { verifyJwt, decodeJwt } = require("../common/helper");
const User = require("../../schemas/userSchema");

const checkPermission = async (user, permission) => {
    try {
        let options = {};
        let allow = false;

        options = { email: user.email };
        let findUser = await User.findOne(options).populate('_role', 'name access_modules');
        if (!findUser || (findUser && !findUser._role)) { return allow; }

        let modules = findUser._role.access_modules;
        if (!modules.length) { return allow; }

        const result = modules.filter(module => {
            let lowCaseModule = module.toLowerCase();
            let lowCasePermission = permission.toLowerCase();
            return lowCaseModule == lowCasePermission;
        });
        if (!result.length) { return allow; }

        allow = true;
        return allow;
    } catch (err) {
        console.log("ERROR :: :: :: ", err);
    }
}

exports.authorize = (permission) => {
    try {
        return [
            async (req, res, next) => {
                try {
                    let berearToken =
                        req.body.token || req.query.token || req.headers["authorization"];

                    if (!berearToken) {
                        return _RESPONSE.sendErrorResponse(res, _MESSAGE.UNAUTHORIZED, _STATUS.UNAUTHORIZED);
                    }

                    /** Verify the token and store user in REQ.USER */
                    const token = berearToken.split(" ")[1];
                    let decode = await verifyJwt(token, process.env.SECRET);
                    req.user = decode;
                    next();
                }
                catch (error) {
                    console.log(error);
                    return _RESPONSE.sendErrorResponse(res, error, _STATUS.INTERNAL_SERVER_ERROR);
                }
            },
            async (req, res, next) => {
                try {
                    console.log(">>>>>>>>>>>> REQ.USER", req.user);
                    if (!req.user) {
                        return _RESPONSE.sendErrorResponse(res, _MESSAGE.UNAUTHORIZED, _STATUS.UNAUTHORIZED);
                    }

                    let result = await checkPermission(req.user, permission);
                    if (!result) {
                        return _RESPONSE.sendErrorResponse(res, _MESSAGE.PERMISSION_DENIED, _STATUS.UNAUTHORIZED);
                    }
                    next();
                }
                catch (error) {
                    console.log(error);
                    return _RESPONSE.sendErrorResponse(res, error, _STATUS.INTERNAL_SERVER_ERROR);
                }
            },
        ]
    } catch (err) {
        console.log("err in Authorize middleware ::: ", err);
    }
};