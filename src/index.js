const express = require('express');
const cors = require('cors');
const { dbConnection }  = require('./db/config');
require('dotenv').config();
const path = require('path');

//Creamos nuestro servidor de express
const app = express();

//Conectamos la base de datos
dbConnection();

//CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//Configuración global de rutas
app.use('/api', require('./routes/index.js'));

app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});