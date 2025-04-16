<script setup>

definePageMeta({
  hideNav: false,
  hideFooter: true
});

const driverName = "Manuel Ernesto Jiménez Contreras";
const direction = "Valparaíso, Manuel Montt 511";
const orderCode = "X5M3";

// const totalProducts = 3;
// const totalPrice = 39970;

const tips = [500, 1000, 5000, 10000];

// const selectedTip = ref(null);
// const selectTip = (tip) => {
//   selectedTip.value = tip;
// };
</script>

<template>
    <!-- CUERPO / CONTENIDO -->
    <div class="flex-1 overflow-y-auto">
      <!-- Progreso: en preparación, listo para envío, en camino -->
      <div class="px-4 py-4">
        <div class="relative px-6 pt-6 pb-4">
          <div class="absolute [top:30.25px] left-16 right-12 h-1 bg-red-600 z-0"></div>

          <div class="flex justify-between relative z-10">
            <div class="flex flex-col items-center text-center">
              <div class="w-4 h-4 rounded-full bg-red-600"></div>
              <span class="text-[10px] mt-1 text-gray-600">En preparación</span>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="w-4 h-4 rounded-full bg-white border border-red-600 border border-4"></div>
              <span class="text-[10px] mt-1 text-gray-600 text-center">Pedido listo para envío</span>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="w-4 h-4 rounded-full bg-white border border-red-600 border border-4"></div>
              <span class="text-[10px] mt-1 text-gray-600">En camino</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mapa -->
      <div class="px-4">
        <!-- En tu proyecto, puedes integrar un <GoogleMap> o <MapBox> real.
             Para referencia rápida, aquí se muestra una imagen placeholder. -->
        <div class="w-full h-64 bg-gray-200 rounded-md overflow-hidden">
          <img
            src="https://placehold.co/600x300?text=Mapa+de+la+ruta"
            alt="Mapa de la ruta"
            class="w-full h-full object-cover"
          >
        </div>
      </div>

      <!-- Información del delivery -->
      <div class="px-4 py-4 space-y-2">
        <div class="flex items-center gap-2">
          <p class="text-sm">
            <strong>Su delivery</strong><br>
            {{ driverName }}
          </p>
        </div>

        <!-- Propinas (opcional). En caso de quererlas interactivas, 
             usa una variable 'selectedTip' con v-model en cada botón. -->
        <div class="text-sm">
          <strong>Propina</strong><br>
          <div class="flex gap-2">
            <button
              v-for="tip in tips"
              :key="tip"
              class="px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              ${{ tip }}
            </button>
            <button class="w-24 px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100">otro</button>
          </div>
        </div>

        <!-- Dirección -->
        <div class="flex items-center gap-2">
          <p class="text-sm">
            <strong>En dirección hacia</strong><br>
            {{ direction }}
          </p>
        </div>
      </div>

      <div class="px-4 py-4 text-center">
        <p class="text-sm mb-2">Dale este código a tu delivery</p>
        <p class="text-3xl font-bold text-red-600">{{ orderCode }}</p>
      </div>
    </div>
</template>
