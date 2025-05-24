/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '../models/user'
import validator from '../validators/user'
import bcrypt from 'bcrypt'

import { Request, Response } from 'express'

const createUser = async (req: Request, res: Response): Promise<any> => {
  let { name, email, password, phone } = req.body
  const { main_address } = req.body
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
      message: 'Error de validación',
      errors
    })
  }

  const existingUser = await User.find({ email })
  if (existingUser.length > 0) {
    return res.status(400).send({
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
    message: 'usuario creado exitosamente',
    user: newUser
  })
}

const loginDummy = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).send({
      message: 'El correo electrónico no está registrado'
    })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).send({
      message: 'La contraseña es incorrecta'
    })
  }
  return res.status(200).send({
    message: 'Inicio de sesión exitoso',
  })
}

export default {
  createUser,
  loginDummy
}
