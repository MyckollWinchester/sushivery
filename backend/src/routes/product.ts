import express from 'express'
import userController from '../controllers/product'

const router = express.Router()

router.post('/', userController.createProduct)
router.get('/', userController.getAllProducts)
router.get('/:id', userController.getProductById)
router.put('/:id', userController.updateProduct)
router.delete('/:id', userController.deleteProduct)
router.get('/category/:category', userController.getProductsByCategory)

export default router
