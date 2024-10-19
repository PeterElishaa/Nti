const express = require('express');
const router = express.Router();
const userTypeController=require('../Controllers/userTypeController');

router.post('/',userTypeController.addNewUserType);
router.get('/',userTypeController.getUserTypes);

module.exports= router;