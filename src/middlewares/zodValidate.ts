import {NextFunction, Request, RequestHandler, Response} from "express";
import {ZodSchema} from "zod";

export const validateData = (schema: ZodSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        req.body = schema.parse(req.body);
        next();
    };
};
