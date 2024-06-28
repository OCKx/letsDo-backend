import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";
import { Status } from "@prisma/client";

const updateTask = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { taskID, taskName, description, status, due_date, reminderDate } = req.body;

    if (!taskID) {
        return res.status(400).json({ status: "FAIL", message: "task ID is required" });
    }
    
    const dueDateTime = new Date(due_date);
    if (isNaN(dueDateTime.getTime())) {
        return res.status(400).send({
            status: "FAIL",
            message: "Invalid due date format. Please use 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:MM:SSZ'."
        });
    }
    
    const reminderDateTime = new Date(reminderDate);
    if (isNaN(reminderDateTime.getTime())) {
        return res.status(400).send({
            status: "FAIL",
            message: "Invalid reminder date format. Please use 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:MM:SSZ'."
        });
    }

    const updateData: { taskName?: string, description?: string, status?: Status, due_date?: Date, reminderDate?: Date } = {};
    
    if (taskName) { updateData.taskName = taskName }
    if (description) { updateData.description = description }
    if (status) { updateData.status = status }
    if (dueDateTime) { updateData.due_date = dueDateTime }
    if (reminderDateTime) { updateData.reminderDate = reminderDateTime }

    try {
        const task = await prisma.task.findUnique({ where: { taskID: Number(taskID) }});
        if (!task) {
            return res.status(404).json({ status: 'FAIL', message: "Task not found" })
        }

        const updatedTask = await prisma.task.update({
            where: { taskID: Number(taskID) },
            data: updateData
        })
        return res.status(200).json({
            status: "SUCCESS",
            message: "Task record has been successfully updated",
            data: updatedTask
        })
    }
    catch (error) {
        res.status(500).json({ status: "ERROR", message: "Failed to update task record" });
        next(error);
    }
})


export default updateTask;