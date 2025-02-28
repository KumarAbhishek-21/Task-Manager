
// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;

// const TaskSchema = new Schema({
//     taskName: {
//         type: String,
//         required: true
//     },
//     isDone: {
//         type: Boolean,
//         required: true
//     }
// });

// const TaskModel = mongoose.model('todos', TaskSchema);
// export default TaskModel;

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relate task to user
    taskName: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const TaskModel = mongoose.model('todos', taskSchema);
export default TaskModel;

