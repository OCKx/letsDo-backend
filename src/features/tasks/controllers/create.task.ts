import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";

const createTask = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { userID, reminderID, taskName, description, due_date } = req.body;

    try {
        const dueDateTime = new Date(due_date);
        if (isNaN(dueDateTime.getTime())) {
            return res.status(400).send({
                status: "FAIL",
                message: "Invalid due date format. Please use 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:MM:SSZ'."
            });
        }

        await prisma.task.create({
            data: {
                userID,
                reminderID,
                taskName,
                description,
                due_date: dueDateTime
            }
        });

        return res.status(201).send({
            status: "SUCCESS",
            message: "Task has been successfully created.",
            data: null
        });
    } catch (error) {
        res.status(500).json({ error: "Task creation failed" });
        next(error);
    }
});


export default createTask;