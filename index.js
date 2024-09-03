import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';
import expressEjsLayouts from "express-ejs-layouts";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("feature", "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// MongoDB connection
// mongoose.connect('mongodb://localhost:27017/issueTracker', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// Routes
// const projectRoutes = require('./routes/project');
// const issueRoutes = require('./routes/issue');
// app.use('/projects', projectRoutes);
// app.use('/issues', issueRoutes);

app.get("/", (req, res)=>{
    res.render("header", {projects:["Amex","Docker","GitHub","Twitter"]});
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
