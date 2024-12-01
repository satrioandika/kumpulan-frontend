const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Create
app.post('/insert', (request, response) => {
    const { nama } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(nama);

    result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err));
});

// Read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err));
});

// Delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);

    result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
});

// Update
app.patch('/ubah', (request, response) => {
    const { id, nama } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNamaById(id, nama);

    result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
});

// Search
app.get('/search/:nama', (request, response) => {
    const { nama } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByNama(nama);

    result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err));
});

app.listen(process.env.PORT, () => console.log(`App is running on port ${process.env.PORT}`));
