
import TaskModel from "../Models/TaskModel.js";


export const createTask = async (req, res) => {
    const { taskName } = req.body;
    const userId = req.user.id; 

    try {
        const task = new TaskModel({ taskName, userId });
        await task.save();

        res.status(201).json({ message: 'Task created successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create task', success: false });
    }
};


export const fetchAllTasks = async (req, res) => {
    const userId = req.user.id;  

    try {
        const tasks = await TaskModel.find({ userId });
        res.status(200).json({ message: 'User-specific tasks fetched', success: true, data: tasks });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch tasks', success: false });
    }
};

export const updateTaskById = async (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.id;
    const updateData = req.body;

    try {
        const task = await TaskModel.findOneAndUpdate(
            { _id: taskId, userId },  
            { $set: updateData },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }

        res.status(200).json({ message: 'Task updated successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update task', success: false });
    }
};




export const deleteTaskById = async (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.id;

    try {
        const task = await TaskModel.findOneAndDelete({ _id: taskId, userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }

        res.status(200).json({ message: 'Task deleted successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete task', success: false });
    }
};
