const { StatusCodes } = require("http-status-codes");

const { UserService } = require("../services");

const { SuccessResponse, ErrorResponse } = require("../utils/common");


/*
method: POST request 
URL: /signup
data: req.body: {email: "email@gmail.com", password: "secret12345"}
*/

async function signup(req, res) {
    try {
        const user = await UserService.signup({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.data = user;
        return res.status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}

module.exports = {
    signup
}