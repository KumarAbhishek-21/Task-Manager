import express from 'express';

// const { createTask, fetchAllTasks, updateTaskById, deleteTaskById } = require('../Controllers/TaskController');
import { createTask, fetchAllTasks, updateTaskById, deleteTaskById } from '../Controllers/TaskController.js';
import authMiddleware from '../middleware/auth.js';


const taskRouter = express.Router();

// To get all the tasks
taskRouter.get('/tasks',authMiddleware, fetchAllTasks);

// To create a task
taskRouter.post('/tasks',authMiddleware, createTask);

// To update a task
taskRouter.put("/tasks/:id",authMiddleware, updateTaskById);

// To delete a task
taskRouter.delete("/tasks/:id",authMiddleware, deleteTaskById);

export default taskRouter;