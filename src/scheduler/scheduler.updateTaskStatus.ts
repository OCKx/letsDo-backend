import cron from 'node-cron';
import prisma from '../../prisma/prisma';
import { Status } from '@prisma/client';

const updateTaskStatus = async () => {
    const currentDate = new Date();
    currentDate.getDate();
    
    currentDate.setHours(0, 0, 0, 0);

    try {
        const tasks = await prisma.task.findMany({
            where: {
                due_date: { equals: currentDate },
                status: { not: Status.uncompleted },
            }
        });

        for (const task of tasks) {
            await prisma.task.update({
                where: { taskID: task.taskID },
                data: { status: Status.uncompleted },
            });
        }

        console.log(`Checked and updated tasks at ${new Date()}`);
    }
    catch (error) {
        console.error('Error updating task statuses:', error);
    }
};

cron.schedule('0 0 * * *', updateTaskStatus);


export default updateTaskStatus;