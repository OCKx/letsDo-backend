import { Request,Response, NextFunction } from "express";
import joi from "joi";

const deleteSubTaskSchema = joi.object({
    subTaskID: joi.number().required().messages({
        "number.empty": "subTaskID is required",
        "number.required": "subTaskID is required"
    })
});

const deleteSubTaskValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteSubTaskSchema.validateAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: 'FAIL', message: error?.message });
        }
    }
}


export default deleteSubTaskValidation;