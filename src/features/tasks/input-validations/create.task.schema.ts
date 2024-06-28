import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

const createTaskSchema = joi.object({
    userID: joi.number().required().messages({
        "number.base": "userID must be a number",
        "number.empty": "userID is required",
        "number.required": "userID is required",
    }),
    taskName: joi.string().required().messages({
        "string.empty": "Task name is required",
        "string.required": "Task name is required",
    }),
    description: joi.string().optional().messages({
        "string.empty": "Description is required",
    }),
    due_date: joi.date().iso().required().messages({
        "date.base": "Due date must be a valid date",
        "date.empty": "Due date is required",
        "date.required": "Due date is required",
    }),
    reminderDate: joi.date().iso().optional().messages({
        "number.empty": "reminderDate is required",
    })
});

const createTaskValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createTaskSchema.validateAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof joi.ValidationError) {
            res.status(400).send({ status: 'FAIL', message: error.details[0].message });
        } else {
            res.status(500).send({ status: 'ERROR', message: 'An unexpected error occurred' });
        }
    }
};


export default createTaskValidation;