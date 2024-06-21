import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

const userSchema = joi.object({
    email: joi.string().email().optional().messages({
        "string.empty": "A valid email is required",
        "string.email": "A valid email is required",
    })
})

const userValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await userSchema.validateAsync(req.query);
        next()
    } catch (error) {
        if(error instanceof Error) {
          res.status(400).send({ status: 'FAIL', message: error?.message })
        }
    }
}


export default userValidation;