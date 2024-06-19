import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";

const getUser = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.query;

    try {
        if (email) {
            const user = await prisma.user.findFirst({ where: { email: email as string } });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
        next(error);
    }
});


export default getUser;