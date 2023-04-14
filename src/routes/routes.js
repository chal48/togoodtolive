const mysqlController = require('../controller/mysqlController')
const serviceController = require('../controller/serviceController')

module.exports = function (app) {
    app.get('/api', (req, res) => {
        mysqlController.getAllUsers()
        res.send('Hello World!')
    })

    app.get('/user/:userId', (req, res) => {
        let user = serviceController.getUserById(req.params.userId)
        user.then((response) => {
            if (response.error != undefined) {
                res.status(200).send(response)
            } else {
                res.status(404).send(response)
            }
        })
            .catch((error) => {
                res.status(502).send(error)
            })
    })

    app.get('/', (req, res) => {
        res.sendFile('/template/home.html', { root: './public' })
    })

    app.post("/api/fixtures", (req, res) => {
        serviceController.makeFixtures()
        res.send('finished')
    })

    app.post('/user/login', (req, res) => {
        if(req.body.email != undefined && req.body.password !=undefined){
            let userEmail = serviceController.login(req.body)//req body objet qu'on recup
            userEmail.then((response) => {
                if (response.error != undefined) {
                    res.status(200)
                } else {
                    res.status(404).send(response)
                }
            })
                .catch((error) => {
                    res.status(502).send(error)
                })
        }else{
            res.status(400).send({
                "error" : "invalid parameters"
            })
        }
    })

    app.delete('/user/delete/:userId',(req, res) =>{
        let userDelete = serviceController.Delete(req.params.userId)
        userDelete.then((response)=>{
            if (response.error == undefined) {
                res.status(200).send(response)
            } else {
                res.status(404).send(response)
            }
        })
        .catch((error) => {
            res.status(502).send(error)
        })
    })
}