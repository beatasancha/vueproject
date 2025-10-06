import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
import pool from './config/db.js';

app.use(express.json());
app.use(cors());

// GET all projects
app.get('/projects', async(req, res) => {
    try{
        const result = await pool.query('SELECT * from projects');
        if(result.rows.length == 0){
            res.status(404).send({error: 'No existing projects found'});
        }else{
            res.status(200).send({data : result.rows});
        }
    }catch(error){
        console.error('Error executing query', error.stack);
        res.status(500).send({error: 'Error retrieving projects'});
    }
})


// POST new project
app.post('/project', async(req, res) => {
    try{
        const insertQuery = "INSERT INTO projects (name, description) VALUES ($1, $2)";
        const values = [req.body.name, req.body.description];
        const result = await pool.query(insertQuery, values);
        res.status(201).send({message: 'Project created successfully'});
    }catch(error){
        console.error('Server error inserting new project', error.stack);
        res.status(500).send({error: 'Error creating new project'});
    }
});

// PUT update project by ID
app.put('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    res.send(`Update project with ID: ${projectId}`);
});

// DELETE project by ID
app.delete('/projects/:id', async (req, res) => {
    const projectId = req.params.id;
    try{
        const deleteQuery = `DELETE FROM projects where id = ${projectId}`
        const result = await pool.query(deleteQuery);
        res.send({message: "Project successfully deleted"});

    }catch(error){
        console.error('Server error deleting project', error.stack);
        res.status(500).send({error: 'Error deleting project'});
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

