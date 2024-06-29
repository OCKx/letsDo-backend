import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";

const createTask = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { userID, taskName, description, due_date, reminderDate } = req.body;

    try {
        if (!userID) {
            return res.status(400).json({ error: "userID is required" });
        }

        const getUser = await prisma.user.findUnique({ where: { userID } });
        if (!getUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const dueDateTime = new Date(due_date);
        if (isNaN(dueDateTime.getTime())) {
            return res.status(400).send({
                status: "FAIL",
                message: "Invalid due date format. Please use 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:MM:SSZ'."
            });
        }
        

        let reminderDateTime: Date;
        if (reminderDate) {
            reminderDateTime = new Date(reminderDate);
            if (isNaN(reminderDateTime.getTime())) {
                return res.status(400).send({
                    status: "FAIL",
                    message: "Invalid reminder date format. Please use 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:MM:SSZ'."
                });
            }

            if (reminderDateTime >= dueDateTime) {
                return res.status(400).send({
                    status: 'FAIL',
                    message: "Reminder date cannot be equal or greater than due date"
                })
            }
        }
        else {
            reminderDateTime = new Date(due_date);
            reminderDateTime.setDate(reminderDateTime.getDate() - 1);
        }

        await prisma.task.create({
            data: {
                userID,
                taskName,
                description,
                due_date: dueDateTime,
                reminderDate: reminderDateTime
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