import userRoute from "@/routes/user.route";
import {NextFunction, Request, Response, Router} from "express";
import HTTP_STATUS from "@/constants/httpStatus";
import ApiError from "@/utils/ApiError";

const defaultRouter = Router();

defaultRouter.get("/", (req: Request, res: Response) => {
    res.send("Welcome to EchoBoard");
});

defaultRouter.use("/v1", userRoute);

defaultRouter.use("*", (req: Request, res: Response) => {
    throw new ApiError(HTTP_STATUS.NOT_FOUND.code, HTTP_STATUS.NOT_FOUND.message, null);
});
export default defaultRouter;
