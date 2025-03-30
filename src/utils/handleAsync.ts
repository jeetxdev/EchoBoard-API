import {Request, Response, NextFunction, RequestHandler} from "express"

const handleAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
}
export default handleAsync;