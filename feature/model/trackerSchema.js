import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    author: String,
    issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }]
});

module.exports = mongoose.model('Project', projectSchema);
