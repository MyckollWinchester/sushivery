import express from 'express'
import orderController from '../controllers/order'

const router = express.Router()

router.post('/placeOrder', orderController.createOrder)
router.post('/getOrders', orderController.getAllOrders)
router.put('/getOrder', orderController.getOrderById)
router.put('/updateOrder/:orderId', orderController.updateOrder)
router.delete('/deleteOrder/:orderId', orderController.deleteOrder)

export default router
