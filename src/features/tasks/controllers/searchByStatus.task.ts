import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";
import { Status } from "@prisma/client";

const searchByStatus = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { userID, status } = req.query;

    try {
        if (!userID) {
            return res.status(400).json({ error: "userID is required" });
        }
        
        const parsedUserID = parseInt(userID as string, 10);
        if (isNaN(parsedUserID)) {
            return res.status(400).json({ error: "userID must be a valid number" });
        }

        if (!status) {
            return res.status(400).json({ error: "Task status is required" });
        }

        const tasks = await prisma.task.findMany({
            where: {
                userID: parsedUserID,
                status: status as Status
            }
        });

        if (tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found for this user with the specified status' });
        }

        return res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
        next(error);
    }
});


export default searchByStatus;