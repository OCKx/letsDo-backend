import { Request,Response, NextFunction } from "express";
import joi from "joi";

const searchByStatusSchema = joi.object({
    userID: joi.number().required().messages({
        "number.empty": "userID is required",
        "number.required": "userID is required"
    }),
    status: joi.string().required().messages({
        "string.empty": "Task status is required",
        "string.required": "Task status is required",
    })
});

const searchByStatusValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await searchByStatusSchema.validateAsync(req.query);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ status: 'FAIL', message: error?.message });
        }
    }
}


export default searchByStatusValidation;