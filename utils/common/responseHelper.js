module.exports = {
    // Sending success response
    sendSuccessResponse: async (res, message, status, data) => {
        return res.status(status).json({
            code: 1,
            type: "success",
            message: message || _MESSAGE.SUCCESS_RESULT,
            data: data || [],
        });
    },

    // Sending error response
    sendErrorResponse: async (res, errMessage, status, data) => {
        return res.status(status).json({
            code: 0,
            type: "error",
            message: errMessage.message ? errMessage.message : errMessage || _MESSAGE.INTERNAL_SERVER_ERROR,
            data: data || [],
        });
    },
};
