import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import prisma from "../../../../prisma/prisma";
import transporter from "../../../utilss/mailTransporter";
import wrapper from "../../../middlewares/asyncWrapper";

const sendReminder = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { taskID } = req.body;

    try {
        const task = await prisma.task.findUnique({
            where: { taskID: taskID }
        });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const user = await prisma.user.findUnique({
            where: { userID: task?.userID }
        })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const templatePath = path.join(process.env.STATIC_FILES_PATH!, 'reminder-mail/index.html');
        let reminderTemplate = fs.readFileSync(templatePath, 'utf-8');
        reminderTemplate = reminderTemplate
            .replace('{{firstName}}', user?.firstName)
            .replace('{{taskName}}', task?.taskName)
            .replace('{{due_date}}', task?.due_date.toLocaleDateString())

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user?.email,
            subject: "Task Reminder",
            html: reminderTemplate
        }

        const currentDateString = new Date().toISOString().split('T')[0];
        const reminderDateString = task.reminderDate.toISOString().split('T')[0];
        if (currentDateString === reminderDateString) {
            await transporter.sendMail(mailOptions);
        }        

        return res.status(200).json({
            status: "SUCCESS",
            message: "Email sent successfully",
            reminerDate: task.reminderDate,
            due_date: task.due_date
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to process reminder request" });
    }
})


export default sendReminder;