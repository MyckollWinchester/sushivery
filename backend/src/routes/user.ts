import express from 'express'
import userController from '../controllers/user'

const router = express.Router()

router.post('/register', userController.createUser)
router.post('/login', userController.loginDummy)

export default router
