const { faker } = require('@faker-js/faker');
const mysqlController = require('./mysqlController')

function makeFixtures() {
    let randomUser = Math.floor(Math.random() * (30 - 20)) + 20
    for (let i = 1; i < randomUser; i++) {
        let user = {
            "email": faker.internet.email(),
            "password": faker.internet.password()
        }
        mysqlController.createUser(user)
        // for (let j = 1; Math.floor(Math.random() * (3 - 1)) + 1; j++){

        //     let post = {
        //         "title" : faker.lorem.sentence(3),
        //         "startDate" : faker.date.between('2020-01-01T00:00:00.000Z', '2021-01-01T00:00:00.000Z'),
        //         "endDate" : faker.date.between('2021-01-02T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
        //         "content" : faker.lorem.paragraphs(5),
        //         "startPrice" : faker.commerce.price(5, 10),
        //         "endPrice" : faker.commerce.price(10,50),
        //         "userId" : i
        //     }

        //     mysqlController.createPost(post)
        // }
    }
}
function getUserById(userId){
    // Transforme en int pour vérifier que c'est bien un chiffre
    userId = parseInt(userId)
    let user = mysqlController.getUserById(userId)
    return new Promise((resolve, reject) => {
        user.then((user) => {
            resolve(user)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

function login(user){
    let userPassword =mysqlController.login(user.email);
    return new Promise((resolve, reject)=>{
        userPassword.then((response)=>{ 
            if(response.password == user.password){
                resolve(response)
            }else{
                resolve({
                    "error" : "the password and the email don't match"
                })
            }      
        })        
    })
}

function Delete(userId){
    userId = parseInt(userId)
    let deleteUser = mysqlController.Delete(userId)
    return new Promise((resolve, reject)=>{
        deleteUser.then((response)=>{
            resolve(response)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}

function getUserById(userId){
    // Transforme en int pour vérifier que c'est bien un chiffre
    userId = parseInt(userId)
    let user = mysqlController.getUserById(userId)
    return new Promise((resolve, reject) => {
        user.then((user) => {
            resolve(user)
        })
        .catch((error) => {
            reject(error)
        })
    })
}
function insertPost(post){
    let postinsert = mysqlController.insertPost(post)
    return new Promise((resolve, reject) => {
        postinsert.then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        })
    })
}
module.exports= {
    makeFixtures,
    getUserById,
    login,
    Delete,
    insertPost
}