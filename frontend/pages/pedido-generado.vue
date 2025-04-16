<script setup>
import { useRouter } from 'vue-router';

definePageMeta({
  hideNav: true,
  hideFooter: true
});

const router = useRouter();

const goToTracking = () => {
  router.push('/seguimiento');
}
</script>

<template>
  <div class="bg-red-600 text-white h-screen w-screen flex flex-col items-center justify-center px-6">
    <div class="[font-size:28px] font-bold mb-6">ありがとうございます！</div>

    <!-- La clase 'animate-slideIn' aplica la animación -->
    <img
      src="/images/fukusuke-delivery.png"
      alt="Repartidor"
      class="w-11/12 [max-width:400px] h-auto mb-6 animate-slideIn"
    >

    <div class="text-center text-lg font-bold mb-10">
      ¡Gracias por tu compra!<br>
      Vamos en camino
    </div>

    <button
      class="px-6 py-3 bg-white text-black rounded-full font-semibold"
      @click="goToTracking"
    >
      Sigue tu pedido
    </button>
  </div>
</template>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slideIn {
  animation: slideIn 1s ease-in-out forwards;
}
</style>
