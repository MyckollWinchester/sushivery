<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

definePageMeta({
  hideNav: false,
  hideFooter: true
});

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="bg-gray-100 flex flex-col">
    <!-- Título de sección -->
    <div class="bg-white px-4 py-3 shadow-sm flex items-center gap-2">
      <button @click="goBack">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <h2 class="font-bold text-lg">Resumen</h2>
    </div>

    <!-- Lista de productos -->
    <div class="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      <div
        v-for="i in 5"
        :key="i"
        class="bg-white rounded-md shadow-sm flex items-center p-3 gap-4"
      >
        <img
          src="https://placehold.co/64x64"
          alt="Producto"
          class="aspect-square object-cover rounded-md"
        >
        <div class="flex-1">
          <p class="font-bold leading-none">Lorem Ipsum - 60 piezas</p>
          <p class="text-xs text-gray-500">
            20 piezas de esto, 20 de ipsum, 20 piezas de amoet y 20 piezas de kanikama.
          </p>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-sm font-bold text-black">$26.000</span>
            <span class="text-sm text-red-500 line-through">$32.000</span>
          </div>
        </div>
        <!-- Controles -->
        <div class="flex flex-col items-center gap-1">
          <button class="w-6 h-6 bg-red-600 text-white rounded-full text-sm leading-none">+</button>
          <span class="text-sm font-bold">1</span>
          <button class="w-6 h-6 bg-red-600 text-white rounded-full text-sm leading-none">–</button>
        </div>
      </div>
    </div>

    <!-- Sticky footer -->
    <div class="absolute w-full bottom-0 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.08)] px-4 py-3">
      <div class="flex items-center justify-between">
        <div class="flex flex-col leading-none">
          <span class="text-sm text-gray-500">3 Productos</span>
          <span class="text-xl font-bold">$32.970</span>
        </div>
        <NuxtLink to="/pedido-generado" class="w-36 h-12 text-white bg-red-600 rounded-full flex items-center justify-center">
          Generar pedido
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
