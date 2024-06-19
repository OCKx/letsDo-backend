import { Router } from "express";
import forgotPaaaword from "../controllers/forgotPass.user";
import forgotPasswordValidation from "../input-validations/forgotPass.user.schema";
import verifyOTP from "../controllers/verifyOTP.user";
import verifyOTPValidation from "../input-validations/verifyOTP.user.schema";

const otpRouter = Router();

otpRouter.post("/forgot-password",forgotPasswordValidation, forgotPaaaword);
otpRouter.post("/verify-otp", verifyOTPValidation, verifyOTP);


export default otpRouter;