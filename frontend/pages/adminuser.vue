<script setup lang="ts">
import type { User } from '@/types/user'
import { onMounted, ref } from 'vue'
import { columns } from '@/components/usertable/columns'
import DataTable from '@/components/usertable/data-table.vue'
import { users } from '~/components/usertable/data'

const data = ref<User[]>([])

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return users
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <h1 class="w-full max-w-3xl font-sans text-4xl font-black py-2 mx-2">Carta activa</h1>
    
    <DataTable class="mx-2" :columns="columns" :data="data" />
    <Nuxt-link to="/edituser">
        <Button class="w-40 my-4 py-6 mx-2 rounded-full font-bold" >Ir a editar</Button>
    </Nuxt-link>
  </div>
</template>