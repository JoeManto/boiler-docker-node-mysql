const mysql = require('mysql');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config()

const db = mysql.createConnection({
    host: process.env.MYSQL_CONTAINER_NAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
});

db.connect(function(err){
    if (err) {
      console.log(err)
        console.log('connection failed waiting');
        return;
    }
    console.log('mysql connected...');
});


const app = express();
const port = 7304;

app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log(`Docker-Node Container ['${process.env.MYSQL_CONTAINER_NAME}'] listening on port ${port}!`))
