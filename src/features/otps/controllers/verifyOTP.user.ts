import { date } from 'joi';
import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import wrapper from "../../../middlewares/asyncWrapper";
import generateJWT from "../../../utilss/generateJWT";

const verifyOTP = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { otp } = req.body;

    try {
        const otpRecord = await prisma.oTP.findFirst({ where: { otp }});

        if (!otpRecord) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        if (otpRecord.expiredAt < new Date()) {
            await prisma.oTP.delete({ where: { otpID: otpRecord.otpID }});
            return res.status(400).json({ error: "OTP expired" });
        }

        if (!otpRecord.userID) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = await prisma.user.findUnique({ where: { userID: otpRecord.userID }});

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const token = await generateJWT({ userID: user.userID });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 90 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ token });

        await prisma.oTP.delete({ where: { otpID: otpRecord.otpID }});
    } catch (error) {
        res.status(500).json({ error: "OTP verification failed" });
        next(error);
    }
});


export default verifyOTP;