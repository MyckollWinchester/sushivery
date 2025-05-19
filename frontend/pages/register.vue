<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { ChevronRight } from 'lucide-vue-next'
import { ChevronLeft } from 'lucide-vue-next'

const router = useRouter()

const goToIndex = () => {
    router.push('/')
}

const pasoActual = ref(1)

const avanzar = () => {
    if (pasoActual.value < 3) pasoActual.value++
}
const retroceder = () => {
    if (pasoActual.value > 1) pasoActual.value--
}

</script>

<template>
    <div class="flex flex-col min-h-screen items-center  bg-fukusuke text-white" >
        <div class="text-center">
            <img src="/images/fukusuke-credentials.png" alt="Logo" class="rounded-sm w-60 mx-auto my-10" />
            <h1 class="text-4xl font-black">Regístrate</h1>    
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

            <div v-if="pasoActual === 1" class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="text font-medium">Nombre</Label>
                <Input id="name" type="text" placeholder="Usawa Reisa" class="bg-white text-black"/>
            </div>

            <div v-if="pasoActual === 2" class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="text font-medium">Fecha de Nacimiento</Label>
                <Input id="fecha" type="text" placeholder="10-12-2000" class="bg-white text-black"/>
            </div>

            <div v-if="pasoActual === 2" class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="text font-medium">Teléfono</Label>
                <Input id="number" type="text" placeholder="9 3223 5665" class="bg-white text-black"/>
            </div>

            <div v-if="pasoActual === 2" class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="text font-medium">Sexo</Label>
                <Input id="sexo" type="text" placeholder="Escoja uno" class="bg-white text-black"/>
            </div>

            <div v-if="pasoActual === 3" class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="text font-medium">Región</Label>
                <Input id="region" type="text" placeholder="BioBio" class="bg-white text-black"/>
            </div>

            <div v-if="pasoActual === 3" class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="text font-medium">Comuna</Label>
                <Input id="comuna" type="text" placeholder="Los Angeles" class="bg-white text-black"/>
            </div>
            <div v-if="pasoActual === 3" class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="text font-medium">Dirección</Label>
                <Input id="text" type="text" placeholder="Los aromos 123" class="bg-white text-black"/>
            </div>

            <a class="m-4"></a>
        </div>

        <div class="my-8">
            <!-- <Button variant="outline" class="text-black w-40 rounded-full my-8 py-6 font-bold">Registrarse</Button> -->
        </div>

        <div class="flex justify-between w-full max-w-sm">
            <Button class="text-white rounded-full  py-6 font-bold w-32" @click="retroceder" :disabled="pasoActual === 1">
                <ChevronLeft class="w-4 h-4 mr-2" /> Atras
            </Button>
            <div class="flex items-center py-4">
                <h1 class="text-sm">Paso {{ pasoActual }} de 3</h1>
            </div>
                <Button class="text-black rounded-full py-6 font-bold w-32" @click="goToIndex" v-if="pasoActual === 3" variant="outline">
                    Registrarse 
                    <!-- <ChevronRight class="w-4 h-4 ml-2" /> -->
                </Button>
            <Button class="text-white rounded-full py-6 font-bold w-32" @click="avanzar" v-else>
                Siguiente <ChevronRight class="w-4 h-4 ml-2" />
            </Button>
    </div>
    </div>

</template>