<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { ref, watch, onMounted } from "vue";
import { useColorMode } from "@vueuse/core";
import "~/assets/css/global.css";

// Dark/Light mode
const isOpen = ref(false);
const colorMode = useColorMode();
const themeIcon = ref("🌞.svg");

const toggleTheme = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};

const updateIcon = () => {
  themeIcon.value = colorMode.value === "dark" ? "🌞.svg" : "🌙.svg";
};

onMounted(() => {
  updateIcon();
});

watch(colorMode, updateIcon);

// Hide/Show footer & nav
const route = useRoute();

const hideFooter = computed(() => route.meta?.hideFooter);
const hideNav = computed(() => route.meta?.hideNav);


</script>

<template>
  <div class="cosito min-h-screen">
    <nav v-if="!hideNav" class="flex items-center justify-between p-4">
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="/images/logo.png" alt="Logo" class="w-8 h-8" draggable="false">
        <div class="text-xl" style="font-family: 'Yuji Mai'">福助</div>
      </NuxtLink>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-4">
          <div class="cursor-pointer text-xl hover:text-fukusuke" draggable="false" @click="toggleTheme" @mousedown.prevent>
            <img :src="`/svg/${themeIcon}`" alt="Theme Icon" class="w-6 h-6">
          </div>
          <button class="md:hidden focus:outline-none" aria-label="Toggle Menu" @click="isOpen = !isOpen">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div class="hidden md:flex gap-6">
          <NuxtLink to="/" class="hover:text-fukusuke">Inicio</NuxtLink>
          <NuxtLink to="/admincarta" class="hover:text-fukusuke">Menú</NuxtLink>
          <NuxtLink to="/adminuser" class="hover:text-fukusuke">Usuarios</NuxtLink>
          <NuxtLink to="/login" class="hover:text-fukusuke">Login</NuxtLink>
        </div>
      </div>
    </nav>

    <div v-if="isOpen && !hideNav" class="flex flex-col items-start gap-4 p-4 md:hidden">
      <NuxtLink to="/" class="hover:text-fukusuke">Inicio</NuxtLink>
      <NuxtLink to="/admincarta" class="hover:text-fukusuke">Menú</NuxtLink>
      <NuxtLink to="/adminuser" class="hover:text-fukusuke">Usuarios</NuxtLink>
      <NuxtLink to="/login" class="hover:text-fukusuke">Login</NuxtLink>
    </div>

    <NuxtPage />

    <footer v-if="!hideFooter" ref="pageFooter" class="bg-gray-100 px-4 md:px-16 py-12">
      <div class="grid md:grid-cols-3 gap-8 text-sm text-gray-700">
        <div>
          <h3 class="font-bold mb-2">Contacto</h3>
          <p>📞 +56 9 1234 5678</p>
          <p>📧 contacto@fukusukesushi.cl</p>
        </div>
      </div>
      <p class="mt-8 text-center text-xs text-gray-400">
        © 2025 Fukusuke Sushi. Ningún derecho reservado.
      </p>
    </footer>
  </div>
</template>
