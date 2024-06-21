import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const verifyOTPSchema = Joi.object({
    otp: Joi.string().required().length(6).messages({
        "string.empty": "OTP is required",
        "string.length": "OTP length must be 6 digits"
    }),
});

const verifyOTPValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await verifyOTPSchema.validateAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: 'FAIL', message: error?.message });
        }
    }
};


export default verifyOTPValidation