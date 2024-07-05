import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";

const deleteSubTask = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { subTaskID } = req.query;

    try {
        if (!subTaskID) {
            return res.status(400).json({ error: "subTaskID is required"});
        }

        const subTask = await prisma.subTask.findUnique({ where: { subTaskID: Number(subTaskID) } });
        if (!subTask) {
            return res.status(400).json({ error: "Sub task not found" })
        }

        await prisma.subTask.delete({ where: { subTaskID: Number(subTaskID) } });
        return res.status(200).json({ message: "Sub task has been successfully deleted" })
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
        next(error);
    }
})


export default deleteSubTask;