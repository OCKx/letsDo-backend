import { Router } from "express";
import createSubTaskValidation from "../input-validations/create.subTask.schema";
import createSubTask from "../controllers/create.subTask";
import deleteSubTaskValidation from "../input-validations/delete.subTask.schema";
import deleteSubTask from "../controllers/delete.subTask";
import getSubTaskValidation from "../input-validations/get.subTask.schema";
import getSubTasks from "../controllers/get.subTask";
import deleteAllSubTask from "../controllers/delete.all-subTask";
import updateSubTaskValidation from "../input-validations/update.subTask.schema";
import updateSubTask from "../controllers/update.subTask";
import deleteAllSubTaskValidation from "../input-validations/delete.all-subTask.schema";

const subTaskRouter = Router();

subTaskRouter.get("/", getSubTaskValidation, getSubTasks)
subTaskRouter.post("/create", createSubTaskValidation, createSubTask);
subTaskRouter.put("/update", updateSubTaskValidation, updateSubTask);
subTaskRouter.delete("/delete", deleteSubTaskValidation, deleteSubTask);
subTaskRouter.delete("/delete-all", deleteAllSubTaskValidation, deleteAllSubTask);


export default subTaskRouter;