import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger-output.json';
import userRoute from "../features/users/routes/user.route";
import otpRoute from "../features/otps/routes/otp.route";
import taskRoute from "../features/tasks/routes/task.route";
import subTaskRoute from "../features/sub-tasks/routes/subTask.route";

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/api/v1/user', userRoute);
router.use('/api/v1/otp', otpRoute);
router.use("/api/v1/task", taskRoute);
router.use("/api/v1/sub-task", subTaskRoute);


export default router;