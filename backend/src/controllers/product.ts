/* eslint-disable @typescript-eslint/no-explicit-any */
import Product from '../models/product'
import validator from '../validators/product'

import { Request, Response } from 'express'

const createProduct = async (req: Request, res: Response): Promise<any> => {
  let { name, description, category, image } = req.body
  const { reference_price, offer_price, available } = req.body

  name = name?.trim()
  description = description?.trim()
  category = category?.trim()
  image = image?.trim()
  
  const { errors, isValid } = validator.validateCreate({
    name,
    description,
    reference_price,
    offer_price,
    category,
    image,
    available
  })

  if (!isValid) {
    return res.status(400).json({ errors })
  }

  try {
    const product = new Product({
      name,
      description,
      reference_price,
      offer_price,
      category,
      image,
      available
    })
    await product.save()
    return res.status(201).json({ message: 'Producto creado exitosamente', product })
  } catch (error) {
    console.error('Error al crear el producto:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const getAllProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const skip = (page - 1) * limit
    const [products, total] = await Promise.all([
      Product.find().skip(skip).limit(limit),
      Product.countDocuments()
    ])
    return res.status(200).send({
      message: 'Productos encontrados',
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (err) {
    return res.status(500).send({
      message: 'Error al obtener los productos',
      error: err
    })
  }
}

const getProductById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).send({ message: `No existe el producto con el ID ${id}` })
    }
    return res.status(200).send({ message: 'Producto encontrado', product })
  } catch (err) {
    return res.status(500).send({ message: 'Error al obtener el producto', error: err })
  }
}

const updateProduct = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  let { name, description, category, image } = req.body
  const { reference_price, offer_price, available } = req.body

  name = name?.trim()
  description = description?.trim()
  category = category?.trim()
  image = image?.trim()
  
  const { errors, isValid } = validator.validateUpdate({
    name,
    description,
    reference_price,
    offer_price,
    category,
    image,
    available
  })

  if (!isValid) {
    return res.status(400).json({ errors })
  }

  try {
    const product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      reference_price,
      offer_price,
      category,
      image,
      available
    }, { new: true })
    if (!product) {
      return res.status(404).send({ message: `No existe el producto con el ID ${id}` })
    }
    return res.status(200).send({ message: 'Producto actualizado exitosamente', product })
  } catch (err) {
    return res.status(500).send({ message: 'Error al actualizar el producto', error: err })
  }
}

const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  try {
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return res.status(404).send({ message: `No existe el producto con el ID ${id}` })
    }
    return res.status(200).send({ message: 'Producto eliminado exitosamente' })
  } catch (err) {
    return res.status(500).send({ message: 'Error al eliminar el producto', error: err })
  }
}

const getProductsByCategory = async (req: Request, res: Response): Promise<any> => {
  const { category } = req.params
  try {
    const products = await Product.find({ category })
    if (products.length === 0) {
      return res.status(404).send({ message: `No existen productos en la categoría ${category}` })
    }
    return res.status(200).send({ message: 'Productos encontrados', products })
  } catch (err) {
    return res.status(500).send({ message: 'Error al obtener los productos por categoría', error: err })
  }
}

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory
}
