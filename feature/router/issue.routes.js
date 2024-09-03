import express from 'express';
const router = express.Router();

router.get('/create/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    res.render('issue-create', { projectId });
});

router.post('/create', async (req, res) => {
    const { title, description, labels, author, projectId } = req.body;
    const issue = new Issue({ title, description, labels: labels.split(','), author, project: projectId });
    await issue.save();
    
    const project = await Project.findById(projectId);
    project.issues.push(issue);
    await project.save();
    
    res.redirect(`/projects/${projectId}`);
});

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
