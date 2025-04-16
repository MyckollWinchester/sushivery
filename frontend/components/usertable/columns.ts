import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '@/types/user'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import DropdownAction from '@/components/usertable/data-table-dropdown.vue'

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'email',
        header: ({ column }) => {
          return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
          }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
    },
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return h(Button, {
              variant: 'ghost',
              onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Rut', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
          },
          cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('id')),
    },
    {
        accessorKey: 'comuna',
        header: ({ column }) => {
          return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
          }, () => ['Comuna', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: '' }, row.getValue('comuna')),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
  
        return h('div', { class: 'relative' }, h(DropdownAction, {
          payment,
        }))
      },
    }
]