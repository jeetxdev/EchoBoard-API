import {createUser} from "@/controllers/user.controller";
import {validateData} from "@/middlewares/zodValidate";
import {signupInputSchema} from "@/validators/user.validators";
import {Router} from "express";
import handleAsync from "@/utils/handleAsync";

const userRouter = Router();
userRouter.post("/signup", validateData(signupInputSchema), handleAsync(createUser));

export default userRouter;
