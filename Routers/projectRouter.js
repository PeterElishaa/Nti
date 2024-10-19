const express = require('express');
const router = express.Router();
const projectController=require('../Controllers/projectController');

router.post('/',projectController.addNewProject);
router.get('/',projectController.getProject);
module.exports= router;