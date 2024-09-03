import mongoose from 'mongoose';
import { issueSchema } from './issueSchema';

const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const Project = require('../models/Project');

const issueModel = mongoose.model('Issue', issueSchema)

router.get('/create/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    res.render('issue-create', { projectId });
});

export const createIssueDocument = async (title, description, labels, author, projectId) => {
    const issue = new Issue({ title, description, labels: labels.split(','), author, project: projectId });
    await issue.save();
    
    const project = await Project.findById(projectId);
    project.issues.push(issue);
    await project.save();
    
};

router.get('/filter', async (req, res) => {
    const { labels, author, search } = req.query;
    let filter = {};
    
    if (labels) filter.labels = { $all: labels.split(',') };
    if (author) filter.author = author;
    if (search) filter.$or = [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    
    const issues = await Issue.find(filter);
    res.render('project-detail', { issues });
});

module.exports = router;
