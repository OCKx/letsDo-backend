import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

const createSubTaskSchema = joi.object({
    taskID: joi.number().required().messages({
        "number.base": "taskID must be a number",
        "number.empty": "taskID is required",
        "number.required": "taskID is required",
    }),
    subTaskName: joi.string().required().messages({
        "string.empty": "Sub task subTaskName is required",
        "string.required": "Sub task subTaskName is required",
    }),
    description: joi.string().optional().messages({
        "string.empty": "Description is required",
    })
});

const createSubTaskValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createSubTaskSchema.validateAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof joi.ValidationError) {
            res.status(400).send({ status: 'FAIL', message: error.details[0].message });
        } else {
            res.status(500).send({ status: 'ERROR', message: 'An unexpected error occurred' });
        }
    }
};


export default createSubTaskValidation;