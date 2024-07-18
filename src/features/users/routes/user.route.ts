import { Router } from "express";
import getUser from "../controllers/get.user";
import login from "../controllers/login.user";
import loginValidation from "../input-validations/login.user.schema";
import registerUser from "../controllers/register.user";
import registerValidation from "../input-validations/register.user.schema";
import logout from "../controllers/logout.user";
import updateUser from "../controllers/update.user";
import updateValidation from "../input-validations/update.user.schema";

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.post("/login", loginValidation, login);
userRouter.post("/register",registerValidation, registerUser);
userRouter.post("/logout", logout);
userRouter.put("/update", updateValidation, updateUser);


export default userRouter;