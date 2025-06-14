/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '../models/user'
import validator from '../validators/user'
import bcrypt from 'bcrypt'
import superUserAuth from './superuser'

import { Request, Response } from 'express'

const createUser = async (req: Request, res: Response): Promise<any> => {
  let { name, email, password, phone } = req.body
  const { main_address } = req.body

  if (!main_address || typeof main_address !== 'object') {
    return res.status(400).send({
      message: 'El campo `main_address` es requerido y debe ser un objeto'
    })
  }
  let { address, additional_information } = main_address

  name = name?.trim()
  email = email?.trim()
  password = password?.trim()
  phone = phone?.trim()
  address = address?.trim()
  additional_information = additional_information?.trim()

  const { errors, isValid } = validator.validateRegister({
    name,
    email,
    password,
    phone,
    main_address: {
      address,
      additional_information
    }
  })

  if (!isValid) {
    return res.status(400).send({
      message: 'Los datos proporcionados no son válidos',
      errors
    })
  }

  const existingUser = await User.find({ email })
  if (existingUser.length > 0) {
    return res.status(409).send({
      message: 'El correo electrónico ya está en uso'
    })
  }

  password = await bcrypt.hash(password, 10)

  const newUser = await User.create({
    name,
    email,
    password,
    phone,
    addresses: [
      {
        address,
        additional_information
      }
    ]
  })

  newUser.save()

  return res.status(200).send({
    message: 'Registrado exitosamente',
    user: newUser
  })
}

interface Address {
  address: string
  additional_information: string
}

const getUser = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params

  const user = await User.findById(userId)
  if (!user) {
    return res.status(404).send({
      message: `No existe el usuario con el ID ${userId}`
    })
  }

  return res.status(200).send({
    message: 'Usuario encontrado',
    user
  })
}

const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const skip = (page - 1) * limit
    const [users, total] = await Promise.all([
      User.find().skip(skip).limit(limit),
      User.countDocuments()
    ])
    return res.status(200).send({
      message: 'Usuarios encontrados',
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (err) {
    return res.status(500).send({
      message: 'Error al obtener los usuarios',
      error: err
    })
  }
}

const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params
  let { name, email, new_password, phone } = req.body
  const { password, addresses } = req.body

  name = name?.trim()
  email = email?.trim()
  new_password = new_password?.trim()
  phone = phone?.trim()

  addresses.forEach((address: Address) => {
    address.address = address.address?.trim()
    address.additional_information = address.additional_information?.trim()
  })

  const { errors, isValid } = validator.validateUpdate({
    name,
    email,
    new_password,
    phone,
    addresses
  })

  if (!isValid) {
    return res.status(400).send({
      message: 'Los datos proporcionados no son válidos',
      errors
    })
  }

  const user = await User.findById(userId)
  if (!user) {
    return res.status(404).send({
      message: `No existe el usuario con el ID ${userId}`
    })
  }

  if (password && new_password) {
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).send({
        message: 'Contraseña actual incorrecta'
      })
    }
    user.password = await bcrypt.hash(new_password, 10)
  }

  user.name = name || user.name
  user.email = email || user.email
  user.phone = phone || user.phone
  user.addresses = addresses || user.addresses
  user.birth = req.body.birth || user.birth

  await user.save()

  return res.status(200).send({
    message: 'Usuario actualizado exitosamente',
    user
  })
}

const authUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body

  if (email.endsWith('@fukusuke.cl')) {
    return superUserAuth.authUser(req, res)
  }

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).send({
      message: 'Credenciales incorrectas'
    })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(401).send({
      message: 'Credenciales incorrectas'
    })
  }

  return res.status(200).send({
    message: 'Inicio de sesión exitoso',
  })
}

export default {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  authUser,
}
