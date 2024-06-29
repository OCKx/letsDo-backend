import { Request,Response, NextFunction } from "express";
import joi from "joi";

const getSubTaskSchema = joi.object({
    taskID: joi.number().required().messages({
        "number.empty": "taskID is required",
        "number.required": "taskID is required"
    })
});

const getSubTaskValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await getSubTaskSchema.validateAsync(req.query);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: 'FAIL', message: error?.message });
        }
    }
}


export default getSubTaskValidation;