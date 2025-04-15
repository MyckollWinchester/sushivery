<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useColorMode } from "@vueuse/core";
import "~/assets/css/global.css";

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
</script>

<template>
  <div>
    <nav class="flex items-center justify-between p-4">
      <div class="flex items-center gap-2">
        <img src="/images/logo.png" alt="Logo" class="w-8 h-8" draggable="false">
        <div class="text-xl" style="font-family: 'Yuji Mai'">福助</div>
      </div>
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
          <NuxtLink to="/default" class="hover:text-fukusuke">Menú</NuxtLink>
          <NuxtLink to="/adminuser" class="hover:text-fukusuke">Usuarios</NuxtLink>
          <NuxtLink to="/login" class="hover:text-fukusuke">Login</NuxtLink>
        </div>
      </div>
    </nav>

    <div v-if="isOpen" class="flex flex-col items-start gap-4 p-4 md:hidde">
      <NuxtLink to="/" class="hover:text-fukusuke">Inicio</NuxtLink>
      <NuxtLink to="/default" class="hover:text-fukusuke">Menú</NuxtLink>
      <NuxtLink to="/adminuser" class="hover:text-fukusuke">Usuarios</NuxtLink>
      <NuxtLink to="/login" class="hover:text-fukusuke">Login</NuxtLink>
    </div>

    <NuxtPage />
  </div>
</template>
