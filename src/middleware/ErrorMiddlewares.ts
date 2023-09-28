
import { NextFunction, Request, Response } from 'express';
import { AppError } from 'helpers/AppError';
const defaults = {}

export const ServerlessErrorMiddleware = () => {
    const onError = async (request) => {
        let apiResponse = {}
        apiResponse["headers"] = {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        };
        if (request.error instanceof AppError) {
            let result = {
                code: request.error.appErrorCode,
                message: request.error.message,
                error: request.error.errors
            }
            apiResponse["body"] = JSON.stringify(result);
            apiResponse["statusCode"] = request.error.httpStatusCode;
        } else {
            let appError = new AppError(500, 5000, "Some error occurred", [])
            let result = {
                code: appError.appErrorCode,
                message: appError.message,
                error: appError.errors
            }
            apiResponse["body"] = JSON.stringify(result);
            apiResponse["statusCode"] = appError.httpStatusCode;
        }
        request.response = apiResponse
        console.log("error = ", request)
        return apiResponse;
    }

    return {
        onError: onError,
    }
}

export const ExpressErrorMiddleware = (error: AppError, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        let result = {
            code: error.appErrorCode,
            message: error.message,
            error: error.errors
        }
        response.status(error.httpStatusCode).send(result)
    } else {
        let appError = new AppError(500, 5000, "Some error occurred", [])
        let result = {
            code: appError.appErrorCode,
            message: appError.message,
            error: appError.errors
        }
        response.status(request.error.httpStatusCode).send(result)
    }
}