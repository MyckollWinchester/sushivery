<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'

import { ChevronRight } from 'lucide-vue-next'
import { ChevronLeft } from 'lucide-vue-next'

const pasoActual = ref(1)

const avanzar = () => {
    if (pasoActual.value < 3) pasoActual.value++
}
const retroceder = () => {
    if (pasoActual.value > 1) pasoActual.value--
}

</script>

<template>
    <div class="flex flex-col min-h-screen items-center bg-fukusuke text-white" >
        <div class="text-center">
            <img src="/images/logo.jpg" alt="Logo" class="rounded-sm w-60 mx-auto my-10" />
            <h1 class="font-sans text-4xl font-black">Registrate</h1>    
        </div>

        <div class="w-full max-w-sm py-4 space-y-4">

            <div v-if="pasoActual === 1" class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="email font-medium">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="Ingrese email" class="bg-white text-black"/>
            </div>

            <div v-if="pasoActual === 1" class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="text font-medium">Rut</Label>
                <Input id="rut" type="text" placeholder="Ej: 12.254.654-9" class="bg-white text-black"/>
            </div>

            <div v-if="pasoActual === 2" class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="email font-medium">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="Ingrese email" class="bg-white text-black"/>
            </div>

            <div v-if="pasoActual === 2" class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="text font-medium">Rut</Label>
                <Input id="rut" type="text" placeholder="Ej: 12.254.654-9" class="bg-white text-black"/>
            </div>

            <div v-if="pasoActual === 3" class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="email font-medium">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="Ingrese email" class="bg-white text-black"/>
            </div>

            <div v-if="pasoActual === 3" class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="text font-medium">Rut</Label>
                <Input id="rut" type="text" placeholder="Ej: 12.254.654-9" class="bg-white text-black"/>
            </div>

            <a class="m-4"></a>
        </div>

        <div class="my-8 py-6">
            <!-- <Button variant="outline" class="text-black w-40 rounded-full my-8 py-6 font-bold">Registrarse</Button> -->
        </div>

        <div class="flex justify-between w-full max-w-sm">
            <Button class="text-white rounded-full  py-6 font-bold w-32" @click="retroceder" :disabled="pasoActual === 1">
                <ChevronLeft class="w-4 h-4 mr-2" /> Atras
            </Button>
            <div class="flex items-center py-4">
                <h1 class="text-sm">Paso {{ pasoActual }} de 3</h1>
            </div>
            <Button class="text-black rounded-full py-6 font-bold w-32" @click="avanzar" v-if="pasoActual === 3" variant="outline">
                Registrarse 
                <!-- <ChevronRight class="w-4 h-4 ml-2" /> -->
            </Button>
            <Button class="text-white rounded-full py-6 font-bold w-32" @click="avanzar" v-else>
                Siguiente <ChevronRight class="w-4 h-4 ml-2" />
            </Button>
        </div>
    </div>

</template>