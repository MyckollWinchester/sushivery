<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast/use-toast'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  rut: z.string().min(7).max(12),
  telefono: z.string().regex(/^\d+$/, "Debe ser un número válido").min(9).max(15),
  region: z.string().min(2).max(50),
  comuna: z.string().min(2).max(50),
  direccion: z.string().min(5).max(100),
  fecha: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Debe ser una fecha válida (DD-MM-YYYY)"),
  sexo: z.enum(['Masculino', 'Femenino', 'Otro']).refine((value) => value !== undefined, {
    message: "Debe seleccionar un sexo válido",
  }),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
    console.log('Enviado:', values);
    toast({
        title: 'Datos enviados correctamente',
        description: h('pre', { 
            class: 'mt-2 w-full max-w-sm rounded-md bg-gray-800 p-4 text-white overflow-auto' 
        }, JSON.stringify(values, null, 2)),
    });
});
</script>

<template>
    <div class="flex items-center flex-col min-h-screen">

        <form class="w-full max-w-xl px-3 space-y-3" @submit.prevent="onSubmit">
            <p class="text-neutral-400 pt-2">Haz cambios en tu cuenta aqui, guarda cuando termines</p>
            <FormField v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty">
                <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Ingresa tu nombre" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            
            <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="Ingresa tu correo electrónico" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="rut" :validate-on-blur="!isFieldDirty">
                <FormItem>
                    <FormLabel>Rut</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Ingresa tu RUT" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="telefono" :validate-on-blur="!isFieldDirty">
                <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Ingresa tu número de teléfono" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
    
            <div class="grid grid-cols-2 gap-4">

                <FormField v-slot="{ componentField }" name="region" :validate-on-blur="!isFieldDirty">
                    <FormItem>
                        <FormLabel>Region</FormLabel>
                        <FormControl>
                            <Select v-bind="componentField">
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona región" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Region 1">Arica</SelectItem>
                                        <SelectItem value="Region 2">Atacama</SelectItem>
                                    <SelectItem value="Region 3">Nose que region seguia</SelectItem>
                                        <!-- Agrega más opciones según sea necesario -->
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                
                <FormField v-slot="{ componentField }" name="comuna" :validate-on-blur="!isFieldDirty">
                    <FormItem>
                        <FormLabel>Comuna</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Ingresa tu comuna" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>

            <FormField v-slot="{ componentField }" name="direccion" :validate-on-blur="!isFieldDirty">
                <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Ingresa tu dirección" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <div class="grid grid-cols-2 gap-4">

                <FormField v-slot="{ componentField }" name="fecha" :validate-on-blur="!isFieldDirty">
                    <FormItem>
                        <FormLabel>Fecha de nacimiento</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="DD-MM-YYYY" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                
                <FormField v-slot="{ componentField }" name="sexo" :validate-on-blur="!isFieldDirty">
                    <FormItem>
                        <FormLabel>Sexo</FormLabel>
                        <FormControl>
                            <Select v-bind="componentField">
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona tu sexo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Masculino">Masculino</SelectItem>
                                        <SelectItem value="Femenino">Femenino</SelectItem>
                                        <SelectItem value="Otro">Otro</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>
    
            <Button type="submit">
                Guardar
            </Button>
        </form>
    </div>
</template>