const express = require('express');
const router = express.Router();
const userController = require('../controllers/UsersController')


router.get('/', userController.getAllUsers)
router.post('/', userController.addUser);


module.exports = router
