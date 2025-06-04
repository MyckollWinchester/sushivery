import validator from 'validator'

interface OrderProduct {
  product_id: string
  quantity: number
  subtotal_price?: number
}

interface OrderPayment {
  payment_method: 'Efectivo' | 'Tarjeta de crédito' | 'Tarjeta de débito'
  payment_date?: Date
  amount?: number
  state?: 'Pendiente' | 'Completado' | 'Fallido'
}

interface ShippingAddress {
  address: string
  additional_information?: string | null
}

interface OrderData {
  total_price?: number
  obs?: string | null
  state?: 'Pendiente' | 'En preparación' | 'En camino' | 'Entregado'
  security_code: string
  order_date?: Date
  delivered_date?: Date | null
  products: OrderProduct[]
  payment: OrderPayment[]
  shipping_address: ShippingAddress
}

const validateOrder = (orderData: OrderData) => {
  const {
    total_price,
    obs,
    state,
    security_code,
    order_date,
    delivered_date,
    products,
    payment,
    shipping_address
  } = orderData
  const errors: Record<string, string> = {}

  //if (typeof total_price !== 'number' || total_price <= 0) {
  //  errors.total_price = 'El campo `total_price` debe ser un número positivo.'
  //}

  if (obs && !validator.isLength(obs, { max: 200 })) {
    errors.obs = 'El campo `obs` puede tener un máximo de 200 caracteres.'
  }

  if (
    state &&
    !['Pendiente', 'En preparación', 'En camino', 'Entregado'].includes(state)
  ) {
    errors.state =
      'El campo `state` debe ser uno de los siguientes valores: Pendiente, En preparación, En camino, Entregado.'
  }

  if (
    !security_code ||
    !validator.isLength(security_code, { min: 3, max: 10 })
  ) {
    errors.security_code =
      'El campo `security_code` es requerido y debe tener entre 3 y 10 caracteres.'
  }

  if (order_date && !(order_date instanceof Date)) {
    errors.order_date = 'El campo `order_date` debe ser una fecha válida.'
  }

  if (delivered_date && !(delivered_date instanceof Date)) {
    errors.delivered_date =
      'El campo `delivered_date` debe ser una fecha válida.'
  }

  if (!Array.isArray(products) || products.length === 0) {
    errors.products =
      'El campo `products` es requerido y debe ser un arreglo no vacío.'
  } else {
    products.forEach((product, index) => {
      if (!product.product_id || !validator.isMongoId(product.product_id)) {
        errors[`products[${index}].product_id`] =
          'El campo `product_id` es requerido y debe ser un ID de producto válido.'
      }
      if (typeof product.quantity !== 'number' || product.quantity <= 0) {
        errors[`products[${index}].quantity`] =
          'El campo `quantity` debe ser un número positivo.'
      }
      //if (
      //  typeof product.subtotal_price !== 'number' ||
      //  product.subtotal_price < 0
      //) 
      //{
      //  errors[`products[${index}].subtotal_price`] =
      //    'El campo `subtotal_price` debe ser un número no negativo.'
      //}
    })
  }
  if (!Array.isArray(payment) || payment.length === 0) {
    errors.payment =
      'El campo `payment` es requerido y debe ser un arreglo no vacío.'
  } else {
    payment.forEach((pay, index) => {
      if (
        !pay.payment_method ||
        !['Efectivo', 'Tarjeta de crédito', 'Tarjeta de débito'].includes(
          pay.payment_method
        )
      ) {
        errors[`payment[${index}].payment_method`] =
          'El campo `payment_method` es requerido y debe ser uno de los siguientes valores: Efectivo, Tarjeta de crédito, Tarjeta de débito.'
      }
      if (pay.amount !== undefined && typeof pay.amount !== 'number') {
        errors[`payment[${index}].amount`] =
          'El campo `amount` debe ser un número válido si se incluye.'
      }
    })
  }
  if (
    !shipping_address ||
    !shipping_address.address ||
    !validator.isLength(shipping_address.address, { min: 5, max: 100 })
  ) {
    errors.shipping_address =
      'El campo `shipping_address` es requerido y debe tener una dirección válida entre 5 y 100 caracteres.'
  } else if (
    shipping_address.additional_information &&
    !validator.isLength(shipping_address.additional_information, { max: 100 })
  ) {
    errors.shipping_address_additional_information =
      'El campo `additional_information` puede tener un máximo de 100 caracteres.'
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

export default { validateOrder }
