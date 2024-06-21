import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";

const registerUser = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const emailFound = await prisma.user.findFirst({ where: { email } });
        if (emailFound) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const hashedPassword = await hash(password, 10);

        await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        });

        return res.status(201).send({
            status: "SUCCESS",
            message: "Account has been successfully created.",
            data: null
        });
    } catch (error) {
        res.status(500).json({ error: "Account creation failed" });
        next(error);
    }
});


export default registerUser;