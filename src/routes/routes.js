const mysqlController = require('../controller/mysqlController')
const serviceController = require('../controller/serviceController')

module.exports = function(app){
    app.get('/api', (req, res) => {
        mysqlController.getAllUsers()
        res.send('Hello World!')
    })

    app.get('/user/:userId', (req, res) => {
        let user = serviceController.getUserById(req.params.userId)
        user.then((response) => {
            if (response.error != undefined){
                res.status(200).send(response)
            }else{
                res.status(404).send(response)
            }
        })
        .catch((error) => {
            res.status(502).send(error)
        })
    })

    app.post('/user/:userId', (req, res) => {
        let user = serviceController.getUserById(req.params.userId)
        user.then((response) => {
            if (response.error != undefined){
                res.status(200).send(response)
            }else{
                res.status(404).send(response)
            }
        })
        .catch((error) => {
            res.status(502).send(error)
        })
    })

    app.patch('/patch/:userId', (req, res) => {
        let user = serviceController.patchUser(req.params.userId, req.body)
        user.then((response) => {
            if (response.error == undefined) {
                res.status(204).send(response)
            } else {
                res.status(404).send(response)
            }
        })
    })

    app.post('/register', (req, res) => {
        let user = serviceController.createUser(req.body)
        user.then((response) => {
            console.log(response.error != undefined)
            if (response.error == undefined) {
                res.status(204).send(response)
            } else {
                res.status(404).send(response)
            }
        })
        // .catch((error) => {
        //     res.status(502).send(error)
        // })
    })

    app.get('/', (req, res) => {
        res.sendFile('/template/home.html', {root: './public' })
    })

    app.post("/api/fixtures", (req, res) => {
        serviceController.makeFixtures()
        res.send('finished')
    })

}