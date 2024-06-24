import { Router } from "express";
import createTask from "../controllers/create.task";
import createTaskValidation from "../input-validations/create.task.schema";
import getTasks from "../controllers/get.task";
import getTaskValidation from "../input-validations/get.task.schema";
import updateTask from "../controllers/update.task";
import updateTaskValidation from "../input-validations/update.task.schema";
import deleteTask from "../controllers/delete.task";
import deleteTaskValidation from "../input-validations/delete.task.schema";
import searchByStatus from "../controllers/searchByStatus.task";
import searchByStatusValidation from "../input-validations/searchByStatus.task.schema";

const taskRouter = Router();

taskRouter.get("/", getTaskValidation, getTasks);
taskRouter.post("/create", createTaskValidation, createTask);
taskRouter.put("/update", updateTaskValidation, updateTask);
taskRouter.delete("/delete", deleteTaskValidation, deleteTask);
taskRouter.get("/search-by-status", searchByStatusValidation, searchByStatus);


export default taskRouter;