import {} from ""
import { createIssueDocument} from "../model/issue.Repository";
import { fetchAllProjects } from "../model/project.Repository";
export const createNewProject = async(req,res,next) =>{
    const {name,description,author} = req.body
    const result = await fetchAllProjects()
}

// find a function that can reload the page from backed to frontend

export const createNewIssue = async (req, res) => {
    const { title, description, labels, author, projectId } = req.body;
    const result = await createIssueDocument(title, description, labels, author, projectId)
    const issue = new Issue({ title, description, labels: labels.split(','), author, project: projectId });
    await issue.save();
    
    const project = await Project.findById(projectId);
    project.issues.push(issue);
    await project.save();
    
};
