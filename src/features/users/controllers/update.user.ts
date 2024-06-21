import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../..//middlewares/asyncWrapper";

const updateUser = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { userID, firstName, lastName, email, password } = req.body;

    if (!userID) {
        return res.status(400).json({ status: "FAIL", message: "User ID is required" });
    }

    const updateData: { firstName?: string, lastName?: string, email?: string, password?: string } = {};
    
    if (firstName) { updateData.firstName = firstName }
    if (lastName) { updateData.lastName = lastName }
    if (email) { updateData.email = email}
    if (password) updateData.password = await hash(password, 10);

    try {
        const updatedUser = await prisma.user.update({
            where: { userID },
            data: updateData
        })
        return res.status(200).json({
            status: "SUCCESS",
            message: "User information has been successfully updated",
            data: updateData
        })
    }
    catch (error) {
        res.status(500).json({ status: "ERROR", message: "Failed to update user information" });
        next(error);
    }
})


export default updateUser;