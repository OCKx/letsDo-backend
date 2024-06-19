import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.empty": "A valid email is required",
        "string.email": "A valid email is required",
    }),
    password: joi.string().min(8).required().messages({
        "string.empty": "A valid password is required",
        "string.required": "A valid password is required.",
        "string.min": "Password must have at least 8 characters.",
    }),
})

const loginValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await loginSchema.validateAsync(req.body);
        next()
    } catch (error) {
        if(error instanceof Error) {
          res.status(400).send({ status: 'FAIL', message: error?.message })
        }
    }
}


export default loginValidation;