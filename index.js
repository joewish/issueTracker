import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/issueTracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
const projectRoutes = require('./routes/project');
const issueRoutes = require('./routes/issue');
app.use('/projects', projectRoutes);
app.use('/issues', issueRoutes);

app.get('/', (req, res) => {
    res.redirect('/projects');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
