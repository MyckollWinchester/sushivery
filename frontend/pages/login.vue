<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import watonFukusuke from '/images/fukusuke-credentials.png'
import { ref } from 'vue'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { useRouter } from 'vue-router'

const router = useRouter()
const formSchema = toTypedSchema(z.object({
  email: z.string().email('Correo inválido').max(50, 'El correo es muy largo'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(30, 'La contraseña es muy larga'),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
  }
})

const loginMessage = ref('')
const loginSuccess = ref(false)

const onSubmit = handleSubmit((values) => {
    const payload = {
      email: values.email,
      password: values.password
    }
    console.log('Form submitted:', payload)
    fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json().then(data => ({ ok: response.ok, data })))
    .then(({ ok, data }) => {
      if (ok) {
        loginMessage.value = '¡Login exitoso! Redirigiendo...';
        loginSuccess.value = true;
        setTimeout(() => {
          router.push('/')
        }, 1500)
      } else {
        loginMessage.value = data.message || 'Credenciales Incorrectas.';
        loginSuccess.value = false;
      }
    })
    .catch(() => {
      loginMessage.value = 'Error de red o servidor.';
      loginSuccess.value = false;
    })
})
</script>

<template>
    <div class="flex flex-col min-h-screen items-center bg-fukusuke text-white" >
        <div class="text-center h-[472px]">
            <img :src="watonFukusuke" alt="Logo" class="rounded-sm w-80 mx-auto my-10" draggable="false">
            <h1 class="font-sans text-4xl font-black">Identifícate</h1>    
            <div v-if="loginMessage" :class="loginSuccess ? 'text-green-400' : 'text-orange-200'" class="text-center font-bold mt-2">{{ loginMessage }}</div>
        </div>
        <form class="w-full max-w-sm py-4 space-y-2" @submit.prevent="onSubmit">
            <FormField name="email" v-slot="{ componentField }">
                <FormItem class="flex flex-col w-auto max-w-sm mx-4 my-2 h-[85px]">
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                        <Input id="email" type="email" placeholder="Ingrese email" class="bg-white text-black" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField name="password" v-slot="{ componentField }">
                <FormItem class="flex flex-col w-auto max-w-sm mx-4 my-2 h-[85px]">
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                        <Input id="password" type="password" placeholder="Ingrese contraseña" class="bg-white text-black" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <a href="#" class="text-sm text-white hover:underline m-4">
                ¿Olvidaste tu contraseña?
            </a>
            
            <Button variant="outline" class="text-black  w-40 rounded-full my-8 py-6 font-bold flex mx-auto" type="submit">Ingresar</Button>
        </form>
        <div class="flex flex-col items-center py-4">
            <h1 class="text-sm">¿No tienes una cuenta?</h1>
            <Nuxt-link to="/register">
                <Button class="w-40 py-6 rounded-full font-bold" >Crear una cuenta</Button>
            </Nuxt-link>
        </div>
    </div>
</template>

<style scoped>
[data-v-app] .form-message,
.form-message,
.text-destructive,
.text-red-500,
.text-red-600 {
  color: #fff3b0 !important;
}
</style>