<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="relative w-full px-16">
      <Carousel class="relative w-full">
        <CarouselContent>
          <CarouselItem
            class="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
          >
            <div class="p-2">
              <Card class="border-none shadow-none">
                <CardContent class="flex flex-col p-0">
                  <img
                    src="/images/productos/tabla-1.webp"
                    alt="Producto"
                    class="aspect-square w-full object-contain rounded-md"
                  >
                  <div class="p-2">
                    <p class="[font-size:20px] font-bold">
                      Tabla 1 - 60 piezas
                    </p>
                    <p class="[font-size:14px] text-red-600">26.000 CLP</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem
            class="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
          >
            <div class="p-2">
              <Card class="border-none shadow-none">
                <CardContent class="flex flex-col p-0">
                  <img
                    src="/images/productos/california-roll.png"
                    alt="Producto"
                    class="aspect-square w-full object-cover rounded-md"
                  >
                  <div class="p-2">
                    <p class="[font-size:16px] font-bold">California Roll</p>
                    <p class="[font-size:12px] text-red-600">600  CLP c/u</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full"
        />
        <CarouselNext
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full"
        />
      </Carousel>
    </div>

    <!-- Promociones -->
    <section class="px-4 md:px-16 py-8">
      <h2 class="text-xl md:text-2xl font-bold mb-6">
        Promociones
        <span
          class="text font-normal align-middle"
          style="font-family: 'Zen Kurenaido'"
          >・ プロモーション</span
        >
      </h2>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="i in 4"
          :key="i"
          class="relative flex gap-4 rounded-lg shadow-md p-4 items-center bg-white"
        >
          <div
            class="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded z-10"
          >
            33% OFF
          </div>

          <img
            src="/images/productos/california-roll.png"
            alt="Promoción Sushi"
            class="w-24 h-24 object-contain"
          >

          <div class="flex flex-col">
            <p class="font-bold">California Roll</p>
            <p class="text-sm text-gray-500 leading-none mb-1">$600 c/u</p>
            <button
              class="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1 rounded w-fit"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Tablas -->
    <section class="px-4 md:px-16 py-8">
      <h2 class="text-xl md:text-2xl font-bold mb-6">
        Tablas
        <span
          class="text font-normal align-middle"
          style="font-family: 'Zen Kurenaido'"
          >・ 寿司セット</span
        >
      </h2>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="i in 4"
          :key="i"
          class="relative flex gap-4 rounded-lg shadow-md p-4 items-center bg-white"
        >
          <img
            src="/images/productos/tabla-1.webp"
            alt="Promoción Sushi"
            class="w-24 h-24 object-contain"
          >

          <div class="flex flex-col">
            <p class="font-bold">60 Piezas</p>
            <p class="text-sm text-gray-500 leading-none mb-1">$26000</p>
            <button
              class="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1 rounded w-fit"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Handroll -->
    <section class="px-4 md:px-16 py-8">
      <h2 class="text-xl md:text-2xl font-bold mb-6">
        Handroll
        <span
          class="text font-normal align-middle"
          style="font-family: 'Zen Kurenaido'"
          >・ ハンドローラー</span
        >
      </h2>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="i in 4"
          :key="i"
          class="relative flex gap-4 rounded-lg shadow-md p-4 items-center bg-white"
        >
          <img
            src="/images/productos/handroll-1.webp"
            alt="Promoción Sushi"
            class="w-24 h-24 object-contain"
          >

          <div class="flex flex-col">
            <p class="font-bold">Pollo Furay</p>
            <p class="text-sm text-gray-500 leading-none mb-1">$3490</p>
            <button
              class="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1 rounded w-fit"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Bebidas -->
    <section class="px-4 md:px-16 py-8">
      <h2 class="text-xl md:text-2xl font-bold mb-6">
        Bebidas
        <span
          class="text font-normal align-middle"
          style="font-family: 'Zen Kurenaido'"
          >・ 飲み物</span
        >
      </h2>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="i in 4"
          :key="i"
          class="relative flex gap-4 rounded-lg shadow-md p-4 items-center bg-white"
        >
          <img
            src="/images/productos/bebida-1.webp"
            alt="Promoción Sushi"
            class="w-24 h-24 object-contain"
          >

          <div class="flex flex-col">
            <p class="font-bold">Banana Milk</p>
            <p class="text-sm text-gray-500 leading-none mb-1">$1800</p>
            <button
              class="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1 rounded w-fit"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Salsas -->
    <section class="px-4 md:px-16 py-8">
      <h2 class="text-xl md:text-2xl font-bold mb-6">
        Salsas
        <span
          class="text font-normal align-middle"
          style="font-family: 'Zen Kurenaido'"
          >・ ソース</span
        >
      </h2>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="i in 4"
          :key="i"
          class="relative flex gap-4 rounded-lg shadow-md p-4 items-center bg-white"
        >
          <img
            src="/images/productos/salsa-1.png"
            alt="Promoción Sushi"
            class="w-24 h-24 object-contain"
          >

          <div class="flex flex-col">
            <p class="font-bold">Salsa de Soya</p>
            <p class="text-sm text-gray-500 leading-none mb-1">$300</p>
            <button
              class="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1 rounded w-fit"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>

    <div
      class="fixed bottom-0 left-0 w-full bg-white px-4 py-3 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"
    >
      <div class="flex justify-between items-center">
        <div class="flex flex-col leading-tight">
          <span class="text-sm text-gray-500">3 Productos</span>
          <span class="text-xl font-bold">$32970</span>
        </div>

        <NuxtLink to="/resumen" class="relative">
          <div
            class="w-36 h-12 text-white bg-red-600 rounded-full flex items-center justify-center"
          >
            Ir a pagar
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
