<!-- components/CartaItem.vue -->
<script setup lang="ts">
import type { Plate } from '@/types/plate'
import { defineProps, defineEmits } from 'vue'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  plate: Plate
}>()

const emits = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'edit', id: number): void
}>()

const handleToggle = () => emits('toggle', props.plate.id)
const handleEdit = () => emits('edit', props.plate.id)
</script>

<template>
  <div
    :class="[{ 'opacity-50': !plate.isActive }, 'flex items-start justify-between gap-3 sm:gap-4 p-3 sm:p-5 border rounded-md']"
    class="transition-opacity duration-300 max-w-4xl"
  >
    <!-- Imagen -->
    <div class="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0">
      <img v-if="plate.image" :src="plate.image" alt="imagen" class="w-full h-full object-cover rounded-md" />
    </div>

    <!-- Info -->
    <div class="flex-1">
      <h2 class="font-bold">{{ plate.name }}</h2>
      <p class="text-sm text-gray-600">{{ plate.description }}</p>
      <div class="mt-1">
        <span class="font-semibold text-lg">${{ plate.price.toLocaleString() }}</span>
        <span v-if="plate.oldPrice" class="line-through text-red-500 text-sm ml-2">
          ${{ plate.oldPrice.toLocaleString() }}
        </span>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <Button :class="[plate.isActive ? 'bg-red-600' : 'bg-green-500']" class="text-white text-sm w-18 sm:w-20 p-2" @click="handleToggle">
        {{ plate.isActive ? 'Quitar' : 'Agregar' }}
      </Button>

      <NuxtLink :to="`/edititem`" class="w-full">
        <Button class="bg-black text-white text-sm w-18 sm:w-20" @click="handleEdit">Editar</Button>
      </NuxtLink>

    </div>
  </div>
</template>