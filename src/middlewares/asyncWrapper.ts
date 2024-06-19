import { Request, Response, NextFunction } from "express";

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>

const wrapper = (asyncFn: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(asyncFn(req, res, next)).catch((error: Error) => {
            res.status(500).send({ status: "ERROR", message: error.message });
        });
    };
}

export default wrapper;