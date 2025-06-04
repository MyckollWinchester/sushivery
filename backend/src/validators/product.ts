import validator from 'validator'

interface CreateData {
  name: string,
  description: string,
  reference_price: number,
  offer_price?: number,
  category: 'Promociones' | 'Tablas' | 'Handrolls' | 'Bebidas' | 'Salsas',
  image: string,
  available?: boolean
}

const validateCreate = (data: CreateData) => {
  const { name, description, reference_price, offer_price, category, image, available } = data
  const errors: Record<string, string> = {}

  if (!name)
    errors.name = 'El campo `name` es requerido.'
  else if (!validator.isLength(name, { min: 2, max: 50 }))
    errors.name = 'El campo `name` debe tener entre 2 y 50 caracteres.'

  if (!description)
    errors.description = 'El campo `description` es requerido.'
  else if (!validator.isLength(description, { min: 10, max: 200 }))
    errors.description = 'El campo `description` debe tener entre 10 y 200 caracteres.'

  if (!reference_price)
    errors.reference_price = 'El campo `reference_price` es requerido.'
  else if (!validator.isNumeric(reference_price.toString()))
    errors.reference_price = 'El campo `reference_price` debe ser un número válido.'

  if (offer_price !== undefined && !validator.isInt(offer_price.toString(), { min: 0 }))
    errors.offer_price = 'El campo `offer_price` debe ser un número entero positivo.'

  if (!category)
    errors.category = 'El campo `category` es requerido.'
  else if (!['Promociones', 'Tablas', 'Handrolls', 'Bebidas', 'Salsas'].includes(category))
    errors.category = 'El campo `category` debe ser uno de los siguientes: Promociones, Tablas, Handrolls, Bebidas, Salsas.'

  if (!image)
    errors.image = 'El campo `image` es requerido.'
  
  if (available !== undefined && typeof available !== 'boolean')
    errors.available = 'El campo `available` debe ser un valor booleano.'

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

interface UpdateData {
  name?: string,
  description?: string,
  reference_price?: number,
  offer_price?: number,
  category?: 'Promociones' | 'Tablas' | 'Handrolls' | 'Bebidas' | 'Salsas',
  image?: string,
  available?: boolean
}

const validateUpdate = (data: UpdateData) => {
  const { name, description, reference_price, offer_price, category, image, available } = data
  const errors: Record<string, string> = {}

  if (name && !validator.isLength(name, { min: 2, max: 50 }))
    errors.name = 'El campo `name` debe tener entre 2 y 50 caracteres.'

  if (description && !validator.isLength(description, { min: 10, max: 200 }))
    errors.description = 'El campo `description` debe tener entre 10 y 200 caracteres.'

  if (reference_price !== undefined && !validator.isNumeric(reference_price.toString()))
    errors.reference_price = 'El campo `reference_price` debe ser un número válido.'

  if (offer_price !== undefined && !validator.isInt(offer_price.toString(), { min: 0 }))
    errors.offer_price = 'El campo `offer_price` debe ser un número entero positivo.'

  if (category && !['Promociones', 'Tablas', 'Handrolls', 'Bebidas', 'Salsas'].includes(category))
    errors.category = 'El campo `category` debe ser uno de los siguientes: Promociones, Tablas, Handrolls, Bebidas, Salsas.'

  if (image && !image.startsWith('http') && !image.startsWith('https'))
    errors.image = 'El campo `image` debe ser una URL válida.'

  if (available !== undefined && typeof available !== 'boolean')
    errors.available = 'El campo `available` debe ser un valor booleano.'

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export default {
  validateCreate,
  validateUpdate
}
