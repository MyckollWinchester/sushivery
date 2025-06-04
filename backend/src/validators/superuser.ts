import validator from 'validator'

interface RegisterData {
  name: string
  email: string
  password: string
  role?: string
}

const validateRegister = (registerData: RegisterData) => {
  const { name, email, password, role } = registerData
  
  const errors: Record<string, string> = {}

  if (!name)
    errors.name = 'El campo `name` es requerido.'
  else if (!validator.isLength(name, { min: 2, max: 50 }))
    errors.name = 'El campo `name` debe tener entre 2 y 50 caracteres.'

  if (!email)
    errors.email = 'El campo `email` es requerido.'
  else if (!validator.isEmail(email))
    errors.email = 'El campo `email` debe ser un correo electrónico válido.'
  else if (!email.endsWith('@fukusuke.cl'))
    errors.email = 'El correo electrónico de la empresa debe terminar con `@fukusuke.cl`.'

  if (!password)
    errors.password = 'El campo `password` es requerido.'
  else if (!validator.isLength(password, { min: 6, max: 30 }))
    errors.password = 'El campo `password` debe tener entre 6 y 30 caracteres.'

  if (role && !['employee', 'admin'].includes(role))
    errors.role = 'El campo `role` debe ser "employee" o "admin".'
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

interface UpdateData {
  name?: string
  email?: string
  new_password?: string
  role?: string
}

const validateUpdate = (updateData: UpdateData) => {
  const { name, email, new_password, role } = updateData

  const errors: Record<string, string> = {}

  if (name && !validator.isLength(name, { min: 2, max: 50 }))
    errors.name = 'El campo `name` debe tener entre 2 y 50 caracteres.'

  if (email && !validator.isEmail(email))
    errors.email = 'El campo `email` debe ser un correo electrónico válido.'

  if (new_password && !validator.isLength(new_password, { min: 6, max: 30 }))
    errors.new_password = 'El campo `new_password` debe tener entre 6 y 30 caracteres.'

  if (role && !['employee', 'admin'].includes(role))
    errors.role = 'El campo `role` debe ser "employee" o "admin".'
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export default {
  validateRegister,
  validateUpdate
}
