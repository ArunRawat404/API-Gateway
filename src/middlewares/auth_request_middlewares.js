const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app_error");
const { UserService } = require("../services");

function validateAuthRequest(req, res, next) {
    if (!req.body.email) {
        ErrorResponse.message = "Something went wrong while authenticating user";
        ErrorResponse.error = new AppError(["Email not found in the incoming request in correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body.password) {
        ErrorResponse.message = "Something went wrong while authenticating user";
        ErrorResponse.error = new AppError(["Password not found in the incoming request in correct form"], StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
};

async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers["x-access-token"]);
        console.log(response)
        if (response) {
            // setting user id in request object
            req.user = response;
            next();
        }
    } catch (error) {
        console.log(error)
        return res.status(error.statusCode)
            .json(error);
    }
}

module.exports = {
    validateAuthRequest,
    checkAuth
}