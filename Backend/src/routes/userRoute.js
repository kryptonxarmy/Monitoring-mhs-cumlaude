const express = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/getAllUsers', userController.getAllUser)
router.get('/get-user-data', authMiddleware, userController.getUserData)


module.exports = router