export interface Plate {
    id: number
    name: string
    description: string
    price: number
    oldPrice?: number
    image?: string
    isActive: boolean
  }