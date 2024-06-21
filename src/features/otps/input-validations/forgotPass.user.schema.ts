import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

const forgotPasswordSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.empty": "A valid email is required",
        "string.email": "A valid email is required",
    })
})

const forgotPasswordValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await forgotPasswordSchema.validateAsync(req.body);
        next()
    } catch (error) {
        if(error instanceof Error) {
          res.status(400).send({ status: 'FAIL', message: error?.message })
        }
    }
}


export default forgotPasswordValidation;