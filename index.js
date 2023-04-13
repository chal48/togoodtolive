const express = require('express')
const app = express()
const port = 8000

app.use('/css',express.static(__dirname+'/profil.css'))

app.use('/img/:filename', (req, res) =>{
    var filename = req.params.filename;
    res.sendFile(__dirname + '/public/img/' + filename);
});

app.get('/api', (req, res) => {
    res.send('Hello World!')
})

app.get('/user/:userId', (req, res) => {
    res.send(req.params.userId)
})

app.get('/profil', (req, res) => {
    res.sendFile(__dirname+'/profil.html')
})

app.listen(port, () => {
    console.log(`http://localhost:${port}/api`)
})


