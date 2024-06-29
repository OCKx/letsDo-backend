import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";

const createSubTask = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { taskID, subTaskName, description } = req.body;

    try {
        if (!taskID) {
            return res.status(400).json({ error: "taskID is required" });
        }

        const task = await prisma.task.findUnique({ where: { taskID } });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        await prisma.subTask.create({
            data: {
                taskID,
                subTaskName,
                description
            }
        });

        return res.status(201).send({
            status: "SUCCESS",
            message: "Sub task has been successfully created.",
            data: null
        });
    } catch (error) {
        res.status(500).json({ error: "Sub task creation failed" });
        next(error);
    }
});


export default createSubTask;