const express = require('express')
const app = express()
const port = 8000
app.use('/css', express.static(__dirname + '/public/style/style.css'));

app.get('/api', (req, res) => {
    res.send('Hello World!')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/template/home.html')
})

app.listen(port, () => {
    console.log(`http://localhost:${port}/api`)
})
