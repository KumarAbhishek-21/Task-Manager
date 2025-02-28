
import TaskModel from "../Models/TaskModel.js";



// export const createTask = async (req, res) => {
//     const data = req.body;
//     try {
//         const model = new TaskModel(data);
//         await model.save();
//         res.status(201)
//             .json({ message: 'Task is created', success: true });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to create task', success: false });
//     }
// }

export const createTask = async (req, res) => {
    const { taskName } = req.body;
    const userId = req.user.id;  // Extract user ID from token

    try {
        const task = new TaskModel({ taskName, userId });
        await task.save();

        res.status(201).json({ message: 'Task created successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create task', success: false });
    }
};


// export const fetchAllTasks = async (req, res) => {
//     try {
//         const data = await TaskModel.find({});
//         res.status(200)
//             .json({ message: 'All Tasks', success: true, data });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to get all tasks', success: false });
//     }
// }


export const fetchAllTasks = async (req, res) => {
    const userId = req.user.id;  

    try {
        const tasks = await TaskModel.find({ userId });
        res.status(200).json({ message: 'User-specific tasks fetched', success: true, data: tasks });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch tasks', success: false });
    }
};

// export const fetchAllTasks = async (req, res) => {
//     try {
//         if (!req.user) {
//             return res.status(401).json({ success: false, message: "Unauthorized access" });
//         }

//         const tasks = await tasks.find({ user: req.user._id });

//         res.status(200).json({ success: true, tasks });
//     } catch (error) {
//         console.error("Error fetching tasks:", error);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };


// export const updateTaskById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const body = req.body;
//         const obj = { $set: { ...body } };
//         await TaskModel.findByIdAndUpdate(id, obj)
//         res.status(200)
//             .json({ message: 'Task Updated', success: true });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to updated task', success: false });
//     }
// }


export const updateTaskById = async (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.id;
    const updateData = req.body;

    try {
        const task = await TaskModel.findOneAndUpdate(
            { _id: taskId, userId },  // Ensure task belongs to user
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


// export const deleteTaskById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         await TaskModel.findByIdAndDelete(id);
//         res.status(200)
//             .json({ message: 'Task is deleted', success: true });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to delete task', success: false });
//     }
// }


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
