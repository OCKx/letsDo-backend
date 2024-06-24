import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";

const getTasks = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.query;

    try {
        if (!userID) {
            return res.status(400).json({ error: "userID is required" });
        }

        const parsedUserID = parseInt(userID as string, 10);
        if (isNaN(parsedUserID)) {
            return res.status(400).json({ error: "userID must be a valid number" });
        }

        const task = await prisma.task.findMany({ where: { userID: parsedUserID } });
        if (task.length === 0) {
            return res.status(404).json({ message: 'No tasks found for this user' });
        }
        
        return res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
        next(error);
    }
});


export default getTasks;