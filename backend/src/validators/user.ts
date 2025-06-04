import validator from 'validator'

interface RegisterData {
  name: string
  email: string
  password: string
  phone: string
  main_address: {
    address: string
    additional_information: string
  }
}

const validateRegister = (registerData: RegisterData) => {
  const { name, email, password, phone, main_address } = registerData
  const { address, additional_information } = main_address
  
  const errors: Record<string, string> = {}

  if (!name)
    errors.name = 'El campo `name` es requerido.'
  else if (!validator.isLength(name, { min: 2, max: 50 }))
    errors.name = 'El campo `name` debe tener entre 2 y 50 caracteres.'

  if (!email)
    errors.email = 'El campo `email` es requerido.'
  else if (!validator.isEmail(email))
    errors.email = 'El campo `email` debe ser un correo electrónico válido.'

  if (!password)
    errors.password = 'El campo `password` es requerido.'
  else if (!validator.isLength(password, { min: 6, max: 30 }))
    errors.password = 'El campo `password` debe tener entre 6 y 30 caracteres.'

  if (!phone)
    errors.phone = 'El campo `phone` es requerido.'
  else if (!validator.isLength(phone, { max: 15 }))
    errors.phone = 'El campo `phone` debe tener entre 1 y 15 caracteres.'

  if (!address)
    errors.address = 'El campo `address` es requerido.'
  else if (!validator.isLength(address, { max: 100 }))
    errors.address = 'El campo `address` debe tener entre 5 y 100 caracteres.'

  if (additional_information && additional_information.length > 0)
    if (!validator.isLength(additional_information, { max: 100 }))
      errors.additional_information = 'El campo `additional_information` puede tener un máximo de 100 caracteres.'

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

interface UpdateData {
  name?: string
  email?: string
  new_password?: string
  phone?: string
  addresses?: Array<{
    address: string
    additional_information: string
  }>
}

const validateUpdate = (updateData: UpdateData) => {
  const { name, email, new_password, phone, addresses } = updateData

  const errors: Record<string, string> = {}

  if (name && !validator.isLength(name, { min: 2, max: 50 }))
    errors.name = 'El campo `name` debe tener entre 2 y 50 caracteres.'

  if (email && !validator.isEmail(email))
    errors.email = 'El campo `email` debe ser un correo electrónico válido.'

  if (new_password && !validator.isLength(new_password, { min: 6, max: 30 }))
    errors.new_password = 'El campo `new_password` debe tener entre 6 y 30 caracteres.'

  if (phone && !validator.isLength(phone, { max: 15 }))
    errors.phone = 'El campo `phone` debe tener entre 1 y 15 caracteres.'

  if (addresses) {
    addresses.forEach((address, index) => {
      if (!address.address)
        errors[`addresses[${index}].address`] = 'El campo `address` es requerido.'
      else if (!validator.isLength(address.address, { max: 100 }))
        errors[`addresses[${index}].address`] = 'El campo `address` debe tener entre 5 y 100 caracteres.'

      if (address.additional_information && !validator.isLength(address.additional_information, { max: 100 }))
        errors[`addresses[${index}].additional_information`] = 'El campo `additional_information` puede tener un máximo de 100 caracteres.'
    })
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export default {
  validateRegister,
  validateUpdate
}
