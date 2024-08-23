import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: ['To-Do', 'In Progress', 'Under Review', 'Completed'],
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'Urgent'],
    },
    deadlinne: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);