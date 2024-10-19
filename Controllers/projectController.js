const Project = require('../Models/pojectModel');

exports.addNewProject = async (req, res) => {
    try
    {
        console.log(req.body);
        const {title, description} = req.body;

        const project = await Project.create({title, description});
        res.status(201).json(project);
    }
    catch(err){
        res.status(500).send(err.message)
    }
}


exports.getProject = async (req,res)=>{
    try{
        const projects = await Project.find();
        res.status(200).json(projects);
    }
    catch(err){
        res.status(500).send(err.message);
    }
}