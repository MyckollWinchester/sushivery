<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ref, h } from 'vue'
import { useRouter } from 'vue-router'

import { ChevronRight } from 'lucide-vue-next'
import { ChevronLeft } from 'lucide-vue-next'

// Importar componentes de formulario shadcn
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

// Importar vee-validate y zod
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

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

// Esquema de validación para el registro
const formSchema = toTypedSchema(z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Correo inválido'),
  telefono: z.string().min(7, 'Teléfono requerido'),
  direccion: z.string().optional(),
  info_adicional: z.string().optional(),
}))

// No es necesario keep-alive ni acceder a values, solo handleSubmit
const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    email: '',
    telefono: '',
    direccion: '',
    info_adicional: '',
  }
})

const onSubmit = handleSubmit((values) => {
    const payload = {
        name: values.name,
        email: values.email,
        phone: values.telefono,
        main_address: {
            address: values.direccion,
            ...(values.info_adicional ? { additional_information: values.info_adicional } : {})
        }
    }
    console.log('Enviado:', payload);
    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
})
</script>

<template>
    <div class="flex flex-col min-h-screen items-center  bg-fukusuke text-white" >
        <div class="text-center">
            <img src="/images/fukusuke-credentials.png" alt="Logo" class="rounded-sm w-60 mx-auto my-10" />
            <h1 class="text-4xl font-black">Regístrate</h1>    
        </div>

        <form class="w-full max-w-sm py-4 space-y-4" @submit.prevent="onSubmit">
            <!-- Cambia v-if por v-show para mantener el estado de los campos -->
            <div v-show="pasoActual === 1">
                <FormField name="name" v-slot="{ componentField }">
                    <FormItem class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                            <Input id="name" type="text" placeholder="Usawa Reisa" class="bg-white text-black" v-bind="componentField"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField name="email" v-slot="{ componentField }">
                    <FormItem class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                            <Input id="email" type="email" placeholder="Ingrese email" class="bg-white text-black" v-bind="componentField"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField name="telefono" v-slot="{ componentField }">
                    <FormItem class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                            <Input id="number" type="text" placeholder="9 3223 5665" class="bg-white text-black" v-bind="componentField"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>

            <div v-show="pasoActual === 2">
                <FormField name="direccion" v-slot="{ componentField }">
                    <FormItem class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                            <Input id="direccion" type="text" placeholder="Los aromos 123" class="bg-white text-black" v-bind="componentField"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField name="info_adicional" v-slot="{ componentField }">
                    <FormItem class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                        <FormLabel>Informacion adicional</FormLabel>
                        <FormControl>
                            <Input id="info_adicional" type="text" placeholder="Casa 78" class="bg-white text-black" v-bind="componentField"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <div class="grid w-auto max-w-sm gap-1.5 m-4 h-10"></div>
            </div>

            <div v-show="pasoActual === 3">
                <FormField name="region" v-slot="{ componentField }">
                    <FormItem class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                        <FormLabel>Región</FormLabel>
                        <FormControl>
                            <Input id="region" type="text" placeholder="BioBio" class="bg-white text-black" v-bind="componentField"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <!-- Puedes agregar más campos para el paso 3 aquí si lo necesitas -->
            </div>
            <a class="m-4"></a>
        </form>

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
            <Button
                class="text-black rounded-full py-6 font-bold w-32"
                v-if="pasoActual === 3"
                variant="outline"
                @click="onSubmit"
            >
                Registrarse 
                <!-- <ChevronRight class="w-4 h-4 ml-2" /> -->
            </Button>
            <Button class="text-white rounded-full py-6 font-bold w-32" @click="avanzar" v-else>
                Siguiente <ChevronRight class="w-4 h-4 ml-2" />
            </Button>
        </div>
    </div>
</template>