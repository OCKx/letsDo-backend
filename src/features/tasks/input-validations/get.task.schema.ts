import { Request,Response, NextFunction } from "express";
import joi from "joi";

const getTaskSchema = joi.object({
    userID: joi.number().required().messages({
        "number.empty": "userID is required",
        "number.required": "userID is required"
    })
});

const getTaskValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await getTaskSchema.validateAsync(req.query);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: 'FAIL', message: error?.message });
        }
    }
}


export default getTaskValidation;