<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-vue-next'

defineProps<{
  payment: {
    id: string
  }
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Opciones</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(payment.id)">
        Copiar Rut
      </DropdownMenuItem>
      <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
      <DropdownMenuItem>Editar Usuario</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="bg-fukusuke text-white">Eliminar Usuario</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>