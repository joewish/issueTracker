import express from 'express';
import mongoose from 'mongoose';
import { projectSchema } from './project.Schema';
const router = express.Router();
const Project = require('../models/Project');

const projectModel = mongoose.model("Project", projectSchema);

export const fetchAllProjects = async() =>{
    try{
        return await projectModel.find();
    }catch(err){
        throw new Error(err)
    }
}

export const createProjectDocument  =async (name,description,author) => {
    try{
        const project = await new projectModel({ name, description, author }).save();
        return project
    }catch(err){
        throw new Error(err)
    }
};

export const projectByIdDocument = async (Id) => {
    try{
        //const project = await projectModel.findById(Id).populate('issues');
        //const project = await projectModel.findById(Id);
        return await projectModel.findById(Id)
    }catch(err){
        throw new Error(err)
    }
}
