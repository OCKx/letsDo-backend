import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

const updateSchema = joi.object({
    userID: joi.required(),
    firstName: joi.string().optional().messages({
        "string.empty": "First name is required",
        "any.optional": "First name is required",
    }),
    lastName: joi.string().optional().messages({
        "string.empty": "Last name is required",
        "any.optional": "Last name is required",
    }),
    email: joi.string().email().optional().messages({
        "string.empty": "A valid email is required",
        "string.email": "A valid email is required",
        "string.optional": "A valid email is required",
    }),
    password: joi.string().min(8).optional().messages({
        "string.empty": "A valid password is required",
        "any.required": "A valid password is required.",
        "any.optional": "A valid password is required.",
        "string.min": "Password must have at least 8 characters.",
    }),
});

const updateValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateSchema.validateAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof joi.ValidationError) {
            res.status(400).send({ status: 'FAIL', message: error.details[0].message });
        } else {
            res.status(500).send({ status: 'ERROR', message: 'An unexpected error occurred' });
        }
    }
};


export default updateValidation;