<script setup lang="ts">
import { ref } from 'vue'
import CartaItem from '@/components/carta/menuitem.vue'
import { plates as initialPlates } from '@/components/carta/dataplate'

const plates = ref([...initialPlates])

const togglePlate = (id: number) => {
    const plate = plates.value.find(p => p.id === id)
    if (plate) {
        plate.isActive = !plate.isActive
    }
}

const editPlate = (id: number) => {
    console.log('Editar plato con ID:', id)
    // Más adelante puedes redirigir o abrir modal
}
</script>

<template>
    <div class="p-4 items-center flex flex-col">
        
        <h1 class="w-full max-w-3xl font-sans text-4xl font-black py-2">Carta activa</h1>

        <div class="space-y-4">
            <CartaItem
                v-for="plate in plates"
                :key="plate.id"
                :plate="plate"
                @toggle="togglePlate"
                @edit="editPlate"
            />
        </div>
    </div>
</template>