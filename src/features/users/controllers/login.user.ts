import { Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";
import generateJWT from "../../../utilss/generateJWT";

const login = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findFirst({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = await generateJWT({ userID: user.userID});

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
        next(error);
    }
});


export default login;