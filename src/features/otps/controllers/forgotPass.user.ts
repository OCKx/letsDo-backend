import { Request, Response, NextFunction } from "express";
import prisma from "../../../../prisma/prisma";
import generateOTP from "../../../utilss/generateOTP";
import transporter from "../../../utilss/mailTransporter";
import wrapper from "../../../middlewares/asyncWrapper";

const forgotPaaaword = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
        const user = await prisma.user.findFirst({ where: { email }});

        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }

        const otp = generateOTP();
        const expiredDate = new Date(Date.now() + 10 * 60 * 1000)

        await prisma.oTP.create({
            data: {
                otp: otp,
                userID: user.userID,
                expiredAt: expiredDate
            }
        })

        const mailOption = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Forgot Password Verification",
            text: `your OTP is ${otp}`
        }

        await transporter.sendMail(mailOption);
        res.status(200).json({ message: "email sent successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to process forgot password request" });
    }
})


export default forgotPaaaword;