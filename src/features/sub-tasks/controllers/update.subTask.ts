import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";

const updateSubTask = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { subTaskID, subTaskName, description, completed } = req.body;

    if (!subTaskID) {
        return res.status(400).json({ status: "FAIL", message: "Sub task ID is required" });
    }

    const updateData: { subTaskName?: string, description?: string, completed?: boolean } = {};
    
    if (subTaskName) { updateData.subTaskName = subTaskName }
    if (description) { updateData.description = description }
    if (completed) { updateData.completed = completed }

    try {
        const subTask = await prisma.subTask.findUnique({ where: { subTaskID: Number(subTaskID) }});
        if (!subTask) {
            return res.status(404).json({ status: 'FAIL', message: "Sub task not found" });
        }

        const updatedSubTask = await prisma.subTask.update({
            where: { subTaskID: Number(subTaskID) },
            data: updateData
        });

        return res.status(200).json({
            status: "SUCCESS",
            message: "Sub task record has been successfully updated",
            data: updatedSubTask
        });
    } catch (error) {
        next(error);
        return res.status(500).json({ status: "ERROR", message: "Failed to update sub task record" });
    }
});


export default updateSubTask;