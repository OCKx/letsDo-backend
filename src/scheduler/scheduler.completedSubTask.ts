import cron from 'node-cron';
import prisma from '../../prisma/prisma';
import { Status } from '@prisma/client';

const checkCompletedSubTask = async () => {
    try {
        // Find all unique task IDs from subTasks
        const tasks = await prisma.subTask.findMany({
            distinct: ['taskID'],
            select: { taskID: true },
        });

        for (const task of tasks) {
            const { taskID } = task;
            
            // Check if all sub-tasks for this taskID are completed
            const allSubTasksCompleted = await prisma.subTask.findMany({
                where: { taskID, completed: false },
            });

            // If no sub-tasks are found with completed: false, all sub-tasks are completed
            if (allSubTasksCompleted.length === 0) {
                await prisma.task.update({
                    where: { taskID },
                    data: { status: Status.done },
                });
            }
        }

        console.log("Updated completed tasks");
    } catch (error) {
        console.error('Error updating task statuses:', error);
    }
};

// Schedule the task to run daily at midnight
cron.schedule('0 0 * * *', checkCompletedSubTask);


export default checkCompletedSubTask;