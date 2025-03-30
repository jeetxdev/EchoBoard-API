import {Request, Response, NextFunction} from "express";
import {ZodError, ZodFormattedError} from "zod";
import {MongooseError} from "mongoose";
import ApiError from "@/utils/ApiError";
import HTTP_STATUS from "@/constants/httpStatus";

function flattenZodErrors(
    formattedError: ZodFormattedError<any>,
    path: string[] = []
): { path: string; message: string }[] {
    const errors: { path: string; message: string }[] = [];
    if (formattedError._errors && formattedError._errors.length > 0) {
        for (const msg of formattedError._errors) {
            errors.push({
                path: path.join('.'),
                message: msg
            });
        }
    }
    for (const key of Object.keys(formattedError)) {
        if (key === "_errors") continue;
        const nested = (formattedError as any)[key];
        if (nested && typeof nested === "object") {
            errors.push(...flattenZodErrors(nested, [...path, key]));
        }
    }
    return errors;
}

export const errorConverter = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    // Handle ZodError
    if (error instanceof ZodError) {
        const formattedError = flattenZodErrors(error.format());
        error = new ApiError(
            HTTP_STATUS.BAD_REQUEST.code,
            HTTP_STATUS.BAD_REQUEST.message,
            formattedError,
            true,
            error.stack
        );
        return next(error);
    }
    // Handle non-ApiError (raw errors)
    if (!(error instanceof ApiError)) {
        const isMongooseError = error instanceof MongooseError;
        const statusCode = (typeof error === 'object' && error !== null && 'statusCode' in error)
            ? (error as any).statusCode
            : undefined;
        const message = (typeof error === 'object' && error !== null && 'message' in error)
            ? (error as any).message
            : undefined;
        const stack = (typeof error === 'object' && error !== null && 'stack' in error)
            ? (error as any).stack
            : undefined;
        error = new ApiError(
            statusCode || (isMongooseError ? HTTP_STATUS.BAD_REQUEST.code : HTTP_STATUS.INTERNAL_SERVER_ERROR.code),
            message || (isMongooseError ? HTTP_STATUS.BAD_REQUEST.message : HTTP_STATUS.INTERNAL_SERVER_ERROR.message),
            null,
            false,
            stack
        );
    }
    next(error);
}
export const handleError = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    const {statusCode, message, error, stack} = err as any;
    const response = {
        code: statusCode,
        message: message,
        error: error,
        ...(process.env.NODE_ENV !== 'production' && {stack: stack})
    }
    res.status(statusCode).json(response)
}
