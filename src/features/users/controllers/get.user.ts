import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";
import { error } from 'console';

const getUser = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.user || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "unauthorized" })
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw error("JWT_SECRET_KEY is not defined in the environment variable");
        }
        const decodedToken: any = jwt.verify(token, secretKey);
        const userID = decodedToken.userID;
        const user = await prisma.user.findUnique({ where: { userID: userID } });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
        
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
        next(error);
    }
});


export default getUser;