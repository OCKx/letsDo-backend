import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

const updateTaskSchema = joi.object({
    taskID: joi.number().required().messages({
        "number.base": "userID must be a number",
        "number.empty": "userID is required",
        "number.required": "userID is required",
    }),
    taskName: joi.string().optional().messages({
        "string.empty": "Task name is optional",
        "string.optional": "Task name is optional",
    }),
    description: joi.string().optional().messages({
        "string.empty": "Description is optional",
        "string.optional": "Description is optional",
    }),
    status: joi.string().optional().messages({
        "string.empty": "Task status is optional",
        "string.optional": "Task status is optional",
    }),
    due_date: joi.date().iso().optional().messages({
        "date.base": "Due date must be a valid date",
        "date.empty": "Due date is optional",
        "date.optional": "Due date is optional",
    }),
    reminderDate: joi.date().iso().optional().messages({
        "number.empty": "reminderDate is required",
    })
});

const updateTaskValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateTaskSchema.validateAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof joi.ValidationError) {
            res.status(400).send({ status: 'FAIL', message: error.details[0].message });
        } else {
            res.status(500).send({ status: 'ERROR', message: 'An unexpected error occurred' });
        }
    }
};


export default updateTaskValidation;