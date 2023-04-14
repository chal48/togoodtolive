const express = require('express')
const app = express()
const port = 8000
const routes = require('./src/routes/routes')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

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

app.use(bodyParser.urlencoded({ extended: true }))

routes(app)

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}/`)
})
