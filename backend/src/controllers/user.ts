/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '../models/user'
import { Request, Response } from 'express'

const createUser = async (req: Request, res: Response): Promise<any> => {
  const { name } = req.body
  
  if (!name) {
    return res.status(400).send({
      message: 'falta especificar `name` en el body'
    })
  }

  const newUser = await User.create({
    name
  })

  newUser.save()

  return res.status(200).send({
    message: 'usuario creado exitosamente',
    user: newUser
  })
}

export default {
  createUser
}
