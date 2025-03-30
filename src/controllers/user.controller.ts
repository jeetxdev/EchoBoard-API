import {Request, RequestHandler, Response} from "express";
import ApiError from "@/utils/ApiError";
import HTTP_STATUS from "@/constants/httpStatus";
import {findUserByEmail, saveUser} from "@/services/user.service";

export const createUser: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const data = req.body;
    const isEmailExists = await findUserByEmail(data.email);
    if (isEmailExists) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST.code, HTTP_STATUS.BAD_REQUEST.message, [{
            path: "email",
            message: "Email already exists"
        }], false);
    }
    const newUser = await saveUser(data);
    res.json({message: "User registered successfully", data: {id: newUser._id}});
};
