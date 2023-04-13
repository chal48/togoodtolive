const express = require('express')
const app = express()
const port = 8000

app.use('/css',express.static(__dirname+'/profil.css'))

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


