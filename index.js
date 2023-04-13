const express = require('express')
const mysql = require("mysql2")
const app = express()
const port = 8001

app.use('/css/:filename', (req, res) =>{
    var filename = req.params.filename;
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

console.log(__dirname + '/public/style/:filename')

app.get('/api', (req, res) => {
    res.send('Hello World!')
})

app.get('/user/:userId', (req, res) => {
    res.send('Page d\'accueil')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/template/home.html')
})

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}/`)
})
