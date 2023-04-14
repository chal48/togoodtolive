const express = require('express')
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


app.get('/api', (req, res) => {
    res.send('Hello World!nkcsejhbc')
})

app.get('/login', (req, res) => {
    res.sendFile('/template/login.html', {root: './public' })
})

app.get('/create', (req, res) => {
    res.sendFile('/template/create.html', {root: './public' })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}/api`)
})
