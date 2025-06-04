import express from 'express'
import userController from '../controllers/superuser'

const router = express.Router()

router.post('/register', userController.createUser)
router.post('/login', userController.authUser)
router.put('/update', userController.updateUser)
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)

export default router
