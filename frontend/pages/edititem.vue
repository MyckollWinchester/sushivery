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
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast/use-toast'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(5).max(200),
  price: z.number().positive(),
  oldPrice: z.number().positive().optional(),
  image: z.string().url().optional(),
  isActive: z.enum(['true', 'false']).refine((value) => value !== undefined, {
    message: "Debe seleccionar un estado válido",
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
            <p class="text-neutral-400 pt-2">Edita los datos del plato aquí y guarda cuando termines</p>
            
            <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
                <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Ingresa el nombre del plato" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="description" :validate-on-blur="!isFieldDirty">
                <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Ingresa la descripción del plato" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="price" :validate-on-blur="!isFieldDirty">
                <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Ingresa el precio del plato" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="oldPrice" :validate-on-blur="!isFieldDirty">
                <FormItem>
                    <FormLabel>Precio anterior</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Ingresa el precio anterior (opcional)" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="image" :validate-on-blur="!isFieldDirty">
                <FormItem>
                    <FormLabel>Imagen</FormLabel>
                    <FormControl>
                        <Input type="url" placeholder="Ingresa la URL de la imagen (opcional)" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="isActive" :validate-on-blur="!isFieldDirty">
                <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                        <Select v-bind="componentField">
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona el estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem :value="'true'">Activo</SelectItem>
                                    <SelectItem :value="'false'">Inactivo</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <Button type="submit">
                Guardar
            </Button>
        </form>
    </div>
</template>