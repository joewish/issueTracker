import mongoose from "mongoose";

export const issueSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    labels: [String],
    author: String,
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});
