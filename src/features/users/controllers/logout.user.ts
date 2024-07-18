import { Request, Response, NextFunction } from "express";
import wrapper from "../../../middlewares/asyncWrapper";

const logout = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('token',  {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "none"
    });
    
    return res.status(200).send({
        Status: "SUCCESS",
        message: "User succssfully logged out.",
        data: null
    });
})


export default logout;