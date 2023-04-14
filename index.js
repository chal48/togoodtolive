const express = require('express')
const app = express()
const port = 8001

app.use("/css", express.static(__dirname+"/public/style/login.css"))

app.get('/api', (req, res) => {
    res.send('Hello World!nkcsejhbc')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname+"/public/template/login.html")
})

app.listen(port, () => {
    console.log(`http://localhost:${port}/api`)
})
