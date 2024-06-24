import { Request,Response, NextFunction } from "express";
import joi from "joi";

const deleteTaskSchema = joi.object({
    taskID: joi.number().optional().messages({
        "number.empty": "taskID is required",
        "number.optional": "taskID is required"
    })
});

const deleteTaskValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteTaskSchema.validateAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: 'FAIL', message: error?.message });
        }
    }
}


export default deleteTaskValidation;