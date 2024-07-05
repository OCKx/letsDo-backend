import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";

const deleteAllSubTask = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { taskID } = req.query;

    try {
        if (!taskID) {
            return res.status(400).json({ error: "taskID is required"});
        }

        const task = await prisma.subTask.findFirst({ where: { taskID: Number(taskID) } });
        if (!task) {
            return res.status(404).json({ error: "Task not found" })
        }

        const subTask = await prisma.subTask.findMany({ where: { taskID: Number(taskID) } });
        if (!subTask) {
            return res.status(400).json({ error: "Sub tasks not found" })
        }

        await prisma.subTask.deleteMany({ where: { taskID: Number(taskID) } });
        return res.status(200).json({ message: "Sub tasks has been successfully deleted" })
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
        next(error);
    }
})


export default deleteAllSubTask;