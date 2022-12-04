const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// Method for hashing the password
const hashPassword = async (password) => {
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

// Method for comparing the password
const comparePassword = async (password, hashedPassword) => {
    let compare = bcrypt.compareSync(password, hashedPassword);
    return compare;
}

// Method for creating the JWT token
const generateJwt = async (payload, secret, options) => {
    let token = JWT.sign(payload, secret, options);
    return token;
}

// Method for verifying the JWT token
const verifyJwt = async (token, secret) => {
    let verify = JWT.verify(token, secret);
    return verify;
}

// Method for decoding the JWT token
const decodeJwt = async (token, secret) => {
    let decode = JWT.decode(token, secret);
    return decode;
}


module.exports = {
    hashPassword,
    comparePassword,
    generateJwt,
    verifyJwt,
    decodeJwt,
};