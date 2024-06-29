import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";

const getSubTasks = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { taskID } = req.query;

    try {
        if (!taskID) {
            return res.status(400).json({ error: "taskID is required" });
        }

        const parsedTaskID = parseInt(taskID as string, 10);
        if (isNaN(parsedTaskID)) {
            return res.status(400).json({ error: "taskID must be a valid number" });
        }

        const subTask = await prisma.subTask.findMany({ where: { taskID: parsedTaskID } });
        if (subTask.length === 0) {
            return res.status(404).json({ message: 'No sub tasks found for this task' });
        }
        
        return res.status(200).json(subTask);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
        next(error);
    }
});


export default getSubTasks;