import { Request,Response, NextFunction } from "express";
import joi from "joi";

const deleteAllSubTaskSchema = joi.object({
    taskID: joi.number().required().messages({
        "number.empty": "taskID is required",
        "number.required": "taskID is required"
    })
});

const deleteAllSubTaskValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteAllSubTaskSchema.validateAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: 'FAIL', message: error?.message });
        }
    }
}


export default deleteAllSubTaskValidation;