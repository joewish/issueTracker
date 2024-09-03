import mongoose from "mongoose";

export const projectSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    author: {type:String, required:true},
    issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }]
});
