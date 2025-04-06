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
    <DataTable :columns="columns" :data="data" />
  </div>
</template>