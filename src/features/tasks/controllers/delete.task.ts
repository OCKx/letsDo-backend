import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";

const deleteTask = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { taskID } = req.body;

    try {
        if (!taskID) {
            return res.status(400).json({ error: "taskID is required"});
        }

        const task = await prisma.task.findUnique({ where: { taskID: Number(taskID) } });
        if (!task) {
            return res.status(400).json({ error: "Task not found" })
        }

        await prisma.task.delete({ where: { taskID: Number(taskID) } });
        return res.status(200).json({ message: "Task has been successfully deleted" })
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
        next(error);
    }
})


export default deleteTask;