<script setup>
import { ref, onMounted } from 'vue';

// PrimeVue Components
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

// Data 

const projects = ref([]);
const fetchProjects = async () => {
    try{
        const response = await fetch("13.228.225.19:3000/projects");
        const data = await response.json();
        projects.value = data.data;
        
    }catch(error){
        console.log('Error fetching all projects', error);
    }
}

// Edit project detail
const editProject = async (project) =>{
    console.log('Selected project to edit: ', project.id)
    try{
        const response = await fetch(`http://localhost:3000/projects/${project.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: project.name,
                description: project.description
            })
        });
    }catch(error){
        console.error('Error updating project details:', error)
    }
}

// Delete project
const deleteProject = async (project) =>{
    console.log('Delete project: ', project.id)
    try{
        const response = await fetch(`http://localhost:3000/projects/${project.id}`, {
            method: 'DELETE',
            body: JSON.stringify(project)
        });
        window.location.reload();
    }catch(error){
        console.error('Error deleting project: ', error);
    }
}

onMounted( () => fetchProjects());
</script>

<template>
    <div>
        <DataTable :value="projects" class="p-datatable-gridlines">
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="actions" header="Actions" >
                <template #body="slotProps">
                    <Button label="Edit" icon="pi pi-pencil" class="p-button-text" @click="editProject(slotProps.data)"></Button>
                    <Button label="Delete" icon="pi pi-trash" class="p-button-text p-button-danger" @click="deleteProject(slotProps.data)"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>