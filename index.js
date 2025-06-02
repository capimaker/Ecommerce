const express = require("express");
const app = express();
const PORT = 3000;

// la base de datos que Importa todos los modelos y la conexión
const db = require("./models"); 
const { User, Order, Product, Category, Review, OrderProduct, ProductCategory } = require("./models");

// aqui va la middleware
app.use(express.json());

// aquí las rutas
app.use("/users", require("./routes/users"));
app.use("/orders", require("./routes/order"));
app.use("/products", require("./routes/product"));
app.use("/categories", require("./routes/category"));




// esto para levantar el server
app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`)
})
