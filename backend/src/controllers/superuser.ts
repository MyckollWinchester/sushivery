/* eslint-disable @typescript-eslint/no-explicit-any */
import SuperUser from '../models/superuser'
import validator from '../validators/superuser'
import bcrypt from 'bcrypt'

import { Request, Response } from 'express'

const createUser = async (req: Request, res: Response): Promise<any> => {
  let { name, email, password, role } = req.body

  name = name?.trim()
  email = email?.trim()
  password = password?.trim()
  role = role?.trim()

  const { errors, isValid } = validator.validateRegister({
    name,
    email,
    password,
    role
  })

  if (!isValid) {
    return res.status(400).send({
      message: 'Los datos proporcionados no son válidos',
      errors
    })
  }

  const existingUser = await SuperUser.find({ email })
  if (existingUser.length > 0) {
    return res.status(409).send({
      message: 'El correo electrónico ya está en uso'
    })
  }

  password = await bcrypt.hash(password, 10)

  const newSuperUser = new SuperUser({
    name,
    email,
    password,
    role: role || 'employee'
  })

  await newSuperUser.save()

  return res.status(200).send({
    message: 'Registrado exitosamente',
    user: newSuperUser
  })
}

const getUser = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params

  const user = await SuperUser.findById(userId)
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
      SuperUser.find().skip(skip).limit(limit),
      SuperUser.countDocuments()
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
  let { name, email, new_password, role } = req.body
  const { password } = req.body

  name = name?.trim()
  email = email?.trim()
  new_password = new_password?.trim()
  role = role?.trim()

  const { errors, isValid } = validator.validateUpdate({
    name,
    email,
    new_password,
    role
  })

  if (!isValid) {
    return res.status(400).send({
      message: 'Los datos proporcionados no son válidos',
      errors
    })
  }

  const user = await SuperUser.findById(userId)
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
  user.role = role || user.role

  await user.save()

  return res.status(200).send({
    message: 'Usuario actualizado exitosamente',
    user
  })
}

const authUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body

  const user = await SuperUser.findOne({ email })
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
  authUser
}
