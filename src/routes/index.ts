import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
//import swaggerDocument from '../docs/swagger-output.json';
import userRoute from "../features/users/routes/user.route";
import otpRoute from "../features/otps/routes/otp.route";

const router = Router();

router.use('/api-docs', swaggerUi.serve);//, swaggerUi.setup(swaggerDocument)
router.use('/api/v1/user', userRoute);
router.use('/api/v1/otp', otpRoute);


export default router;