

<template>
  <div>
    <nav class="p-4 bg-gray-800 text-white flex gap-4">
      <NuxtLink to="/" class="hover:text-gray-400">Inicio</NuxtLink>
      <NuxtLink to="/default" class="hover:text-gray-400">Menú</NuxtLink>
      <NuxtLink to="/adminuser" class="hover:text-gray-400">Pedidos</NuxtLink>
    </nav>

    <NuxtPage />
    
    <h1>zero to hero...</h1>
  </div>

</template>
