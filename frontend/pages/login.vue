<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
</script>

<template>
    <div class="flex flex-col min-h-screen items-center bg-fukusuke text-white" >
        <div class="text-center">
            <img src="/images/logo.jpg" alt="Logo" class="rounded-sm w-60 mx-auto my-10" />
            <h1 class="font-sans text-4xl font-black">Identifícate</h1>    
        </div>
        <div class="w-full max-w-sm py-4 space-y-4">
            <div class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="email font-medium">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="Ingrese email" class="bg-white text-black"/>
            </div>
            <div class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="password font-medium">Contraseña</Label>
                <Input id="password" type="password" placeholder="Ingrese contraseña" class="bg-white text-black"/>
            </div>
            <a href="#" class="text-sm text-white hover:underline m-4">
                ¿Olvidaste tu contraseña?
            </a>
        </div>
        <div>
            <Button variant="outline" class="text-black w-40 rounded-full my-8 py-6 font-bold">Ingresar</Button>
        </div>
        <div class="flex flex-col items-center py-4">
            <h1 class="text-sm">¿No tienes una cuenta?</h1>
            <Nuxt-link to="/register">
                <Button class="w-40 py-6 rounded-full font-bold" >Crear una cuenta</Button>
            </Nuxt-link>
        </div>
    </div>

</template>