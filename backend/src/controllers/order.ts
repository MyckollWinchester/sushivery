/* eslint-disable @typescript-eslint/no-explicit-any */
import Order from '../models/order'
import validator from '../validators/order'


import { Request, Response } from 'express'

const createOrder = async (req: Request, res: Response): Promise<any> => {
  let { obs, security_code, order_date, delivered_date } = req.body
  const { state, products, payment, shipping_address } = req.body

  obs = obs?.trim()
  security_code = security_code?.trim()
  order_date = order_date ? new Date(order_date) : new Date()
  delivered_date = delivered_date ? new Date(delivered_date) : null
  shipping_address.address = shipping_address.address?.trim()
  shipping_address.additional_information = shipping_address.additional_information?.trim()

  const { errors, isValid } = validator.validateOrder({
    obs,
    state,
    security_code,
    order_date,
    delivered_date,
    products,
    payment,
    shipping_address
  })
  
  if (!isValid) {
    return res.status(400).send({
      message: 'Los datos proporcionados no son válidos',
      errors
    })
  }

  const newOrder = await Order.create({
    obs,
    state,
    security_code,
    order_date,
    delivered_date,
    products,
    payment,
    shipping_address
  })
  newOrder.save()
  return res.status(201).send({
    message: 'Orden creada exitosamente',
    order: newOrder
  })
}

const getAllOrders = async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const skip = (page - 1) * limit
    const [orders, total] = await Promise.all([
      Order.find().skip(skip).limit(limit),
      Order.countDocuments()
    ])
    return res.status(200).send({
      message: 'Órdenes encontrados',
      orders,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (err) {
    return res.status(500).send({
      message: 'Error al obtener las órdenes',
      error: err
    })
  }
}

const getOrderById = async (req: Request, res: Response): Promise<any> => {
  const { orderId } = req.params

  const order = await Order.findById(orderId)
  if (!order) {
    return res.status(404).send({
      message: 'Orden no encontrada'
    })
  }
  return res.status(200).send({
    message: 'Orden encontrada',
    order
  })
}

const updateOrder = async (req: Request, res: Response): Promise<any> => {
  const { orderId } = req.params
  let { obs, security_code, order_date, delivered_date } = req.body
  const { state, products, payment, shipping_address } = req.body

  obs = obs?.trim()
  security_code = security_code?.trim()
  order_date = order_date ? new Date(order_date) : new Date()
  delivered_date = delivered_date ? new Date(delivered_date) : null
  shipping_address.address = shipping_address.address?.trim()
  shipping_address.additional_information = shipping_address.additional_information?.trim()

  const { errors, isValid } = validator.validateOrder({
    obs,
    state,
    security_code,
    order_date,
    delivered_date,
    products,
    payment,
    shipping_address
  })

  if (!isValid) {
    return res.status(400).send({
      message: 'Los datos proporcionados no son válidos',
      errors
    })
  }

  const updatedOrder = await Order.findByIdAndUpdate(orderId, {
    obs,
    state,
    security_code,
    order_date,
    delivered_date,
    products,
    payment,
    shipping_address
  }, { new: true }).populate('products.product_id')

  if (!updatedOrder) {
    return res.status(404).send({
      message: 'Orden no encontrada'
    })
  }

  return res.status(200).send({
    message: 'Orden actualizada exitosamente',
    order: updatedOrder
  })
}

const deleteOrder = async (req: Request, res: Response): Promise<any> => {
  const { orderId } = req.params
  const deletedOrder = await Order.findByIdAndDelete(orderId)
  if (!deletedOrder) {
    return res.status(404).send({
      message: 'Orden no encontrada'
    })
  }
  return res.status(200).send({
    message: 'Orden eliminada exitosamente',
    order: deletedOrder
  })
}

export default {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
}
