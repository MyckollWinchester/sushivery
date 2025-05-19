import express from 'express'
import userController from '../controllers/user'

const router = express.Router()

router.post('/register', userController.createUser)

export default router
