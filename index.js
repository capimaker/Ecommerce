const express = require("express");
const app = express();

app.use(express.json())
const PORT = 3000;



app.listen(PORT, () => {
console.log( `puerto levantado en http://localhost${PORT}`);
});

const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '17Skrown27',
});

db.connect();

app.get('/createdb',(req, res)=>{
    let sql = 'CREATE DATABASE expressDB';
    db.query(sql,(err, result)=>{
        if (err)throw err; 
         console.log(result);   
        res.send('Database created...')
    })
})