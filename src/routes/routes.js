const mysqlController = require('../controller/mysqlController')

module.exports = function(app){
    app.get('/api', (req, res) => {
        mysqlController.getAllUsers()
        res.send('Hello World!')
    })

    app.get('/user/:userId', (req, res) => {
        res.send('Page d\'accueil')
    })

    app.get('/', (req, res) => {
        res.sendFile('/template/home.html', {root: './public' })
    })
}