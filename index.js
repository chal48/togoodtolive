const express = require('express')
const app = express()
const port = 8001

app.get('/api', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`http://localhost:${port}/api`)
})
