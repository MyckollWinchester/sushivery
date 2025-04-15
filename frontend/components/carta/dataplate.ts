import type { Plate } from '@/types/plate'

export const plates: Plate[] = [
  {
    id: 1,
    name: 'Lorem Ipsum - 60 piezas',
    description: '20 piezas de lorem, 20 piezas de ipsum, 20 piezas de amet y 20 piezas de kanikama.',
    price: 26000,
    oldPrice: 32000,
    isActive: true
  },
  {
    id: 2,
    name: 'Lorem Ipsum - 30 piezas',
    description: '20 piezas de lorem, 10 piezas de ipsum.',
    price: 26000,
    oldPrice: 32000,
    isActive: true
  },
  {
    id: 3,
    name: 'Lorem Ipsum - 10 piezas',
    description: '10 piezas de lorem.',
    price: 26000,
    oldPrice: 32000,
    isActive: false
  },
  // Más platos...
]
