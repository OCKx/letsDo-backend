import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";
import generateJWT from "../../../utilss/generateJWT";

const registerUser = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const emailFound = await prisma.user.findFirst({ where: { email } });
        if (emailFound) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        });

        const token = await generateJWT({ userID: newUser.userID});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 90 * 24 * 60 * 60 * 1000
        });

        return res.status(201).send({
            status: "SUCCESS",
            message: "Account has been successfully created.",
            data: { token }
        });
    } catch (error) {
        res.status(500).json({ error: "Account creation failed" });
        next(error);
    }
});


export default registerUser;