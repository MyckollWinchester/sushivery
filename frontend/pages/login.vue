<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
</script>

<template>
    <div class="flex flex-col min-h-screen items-center bg-fukusuke text-white" >
        <div class="text-center">
            <img src="/images/logo.jpg" alt="Logo" class="rounded-sm w-60 mx-auto my-10" />
            <h1 class="font-sans text-4xl">Identificate</h1>    
        </div>
        <div class="w-full max-w-sm py-4 space-y-4">
            <div class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="email">Correo Electronico</Label>
                <Input id="email" type="email" placeholder="Ingrese email" class="bg-white"/>
            </div>
            <div class="grid w-auto max-w-sm items-center gap-1.5 m-4">
                <Label for="password">Contraseña</Label>
                <Input id="password" type="password" placeholder="Ingrese contraseña" class="bg-white"/>
            </div>
            <a href="#" class="text-sm text-white hover:underline m-4">
                ¿Olvidaste tu contraseña?
            </a>
        </div>
        <div>
            <Button variant="outline" class="text-black w-40 rounded-full my-8 py-6">Siguiente</Button>
        </div>
        <div class="flex flex-col items-center py-4">
            <h1 class="text-sm">¿No tienes una cuenta?</h1>
            <Button class="w-40 py-6 rounded-full">Crear una cuenta</Button>
        </div>
    </div>

</template>