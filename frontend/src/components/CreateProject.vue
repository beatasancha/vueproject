<script setup>
import { ref } from 'vue';
import Carousel from 'primevue/carousel';
import Card  from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const name = ref("");
const description = ref("");

// Create new project

const createProject = async () =>{
    const newProject = {name: name.value, description:description.value}
    console.log("newProject data: ", newProject);
    try{
        const response = await fetch("http://localhost:3000/project",{
            method: 'POST',
            headers:{
                 'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProject)
        })
        window.location.reload();
    }catch(error){

    }
}
</script>

<template>
    <Card>
        <template #title>
            <h2>Create New Project</h2>
        </template>
        <template #content>
            <InputText placeholder="Project Name" class="p-inputtext-lg p-d-block p-mb-3" v-model="name" />
            <InputText placeholder="Project Description" class="p-inputtext-lg p-d-block p-mb-3" v-model="description"/>
            <Button label="Create Project" icon="pi pi-check" class="p-button-lg" @click="createProject()"/>
        </template>
    </Card>
</template>