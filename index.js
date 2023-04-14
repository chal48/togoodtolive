const express = require('express')
const mysql = require("mysql2")
const app = express()
const port = 8000

const routes = require('./src/routes/routes')

app.use('/css/:filename', (req, res) =>{
    var filename = req.params.filename;
    console.log(__dirname + '/public/style/' + filename)
    res.sendFile(__dirname + '/public/style/' + filename);
});

app.use('/img/:filename', (req, res) =>{
    var filename = req.params.filename;
    res.sendFile(__dirname + '/public/img/' + filename);
});

app.use('/js/:filename', (req, res) =>{
    var filename = req.params.filename;
    res.sendFile(__dirname + '/public/script/' + filename);
});

routes(app)

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}/`)
})
