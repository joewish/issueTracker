import express from 'express';
const router = express.Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
    const projects = await Project.find();
    res.render('index', { projects });
});

router.get('/create', (req, res) => {
    res.render('project-create');
});

router.post('/create', async (req, res) => {
    const { name, description, author } = req.body;
    await new Project({ name, description, author }).save();
    res.redirect('/projects');
});

router.get('/:id', async (req, res) => {
    const project = await Project.findById(req.params.id).populate('issues');
    res.render('project-detail', { project });
});

module.exports = router;
