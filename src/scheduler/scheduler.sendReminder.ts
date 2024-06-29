import cron from "node-cron";
import fs from "fs";
import path from "path";
import prisma from "../../prisma/prisma";
import transporter from "../utilss/mailTransporter";

const sendReminder = async () => {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                reminderDate: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)), // Reminder date is today or later
                    lt: new Date(new Date().setHours(23, 59, 59, 999)) // Reminder date is today
                }
            }
        });

        for (const task of tasks) {
            const user = await prisma.user.findUnique({
                where: { userID: task.userID }
            });

            if (user) {
                const templatePath = path.join(process.env.STATIC_FILES_PATH!, 'reminder-mail/index.html');
                let reminderTemplate = fs.readFileSync(templatePath, 'utf-8');
                reminderTemplate = reminderTemplate
                    .replace('{{firstName}}', user.firstName)
                    .replace('{{taskName}}', task.taskName)
                    .replace('{{due_date}}', task.due_date.toLocaleDateString());

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: "Task Reminder",
                    html: reminderTemplate
                };

                await transporter.sendMail(mailOptions);
            }
        }

        console.log('Reminders sent successfully');
    }
    catch (error) {
        console.error('Error sending reminders:', error);
    }
};

cron.schedule('0 9 * * *', sendReminder);


export default sendReminder;