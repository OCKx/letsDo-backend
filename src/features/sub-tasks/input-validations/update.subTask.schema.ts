import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

const updateSubTaskSchema = joi.object({
    subTaskID: joi.number().required().messages({
        "number.base": "subTaskID must be a number",
        "number.empty": "subTaskID is required",
        "number.required": "subTaskID is required",
    }),
    subTaskName: joi.string().optional().messages({
        "string.empty": "SubTaskName is optional",
        "string.optional": "SubTaskName is optional",
    }),
    description: joi.string().optional().messages({
        "string.empty": "Description is optional",
    }),
    completed: joi.boolean().optional().messages({
        "boolean.empty": "completed is optional"
    })
});

const updateSubTaskValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateSubTaskSchema.validateAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof joi.ValidationError) {
            res.status(400).send({ status: 'FAIL', message: error.details[0].message });
        } else {
            res.status(500).send({ status: 'ERROR', message: 'An unexpected error occurred' });
        }
    }
};


export default updateSubTaskValidation;