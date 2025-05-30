const express = require("express");
const app = express();
const PORT = 3000;

// la base de datos que Importa todos los modelos y la conexión
const db = require("./models"); 

// aqui va la middleware
app.use(express.json());

// aquí las rutas
app.use("/user", require("./routes/user"));


// esto para levantar el server
app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`)
})
