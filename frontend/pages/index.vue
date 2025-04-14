<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <div class="relative w-full px-16">
      <Carousel class="relative w-full">
        <CarouselContent>
          <!-- <CarouselItem
            v-for="(_, index) in 10"
            :key="index"
            class="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
          >
            <div class="p-1">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <span class="text-4xl font-semibold">{{ index + 1 }}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem> -->
          <CarouselItem class="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5">
            <div class="p-2">
              <Card class="border-none shadow-none">
                <CardContent class="flex flex-col p-0">
                  <img
                    src="https://placehold.co/256x256"
                    alt="Producto"
                    class="aspect-square w-full object-cover rounded-md"
                  />
                  <div class="p-2">
                    <p class="[font-size:16px] font-bold ">Lorem Ipsum - 60 piezas</p>
                    <p class="[font-size:12px] text-red-600">26.000 CLP</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem class="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5">
            <div class="p-1">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <span class="text-4xl font-semibold">2</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full" />
        <CarouselNext class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full" />
      </Carousel>
    </div>
  </div>
</template>
