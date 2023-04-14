const { faker } = require('@faker-js/faker');
const mysqlController = require('./mysqlController')
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

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

function patchUser(userId, userInformations) {
    userId = parseInt(userId)
    let email = userInformations.email
    let user = mysqlController.patchUser(userId, userInformations)
    return new Promise((resolve, reject) => {
        user.then((user) => {
            if (emailRegexp.test(email)) {
                resolve(user)
            } else {
                resolve({
                    "error" : "Invalid email address"
                })
            }
        })
        .catch((error) => {
            reject(error)
        })
    })
}

function getAllPosts() {
    let posts = mysqlController.getAllPosts()
    return new Promise((resolve, reject) => {
        posts.then((posts) => {
            resolve(posts)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

function getPostById(postId) {
    postId = parseInt(postId)
    let post = mysqlController.getPostById(postId)
    return new Promise((resolve, reject) => {
        post.then((post) => {
            resolve(post)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

function deletePostById(postId) {
    postId = parseInt(postId)
    let deletePost = mysqlController.deletePostById(postId)
    return new Promise((resolve, reject)=>{
        deletePost.then((response)=>{
            resolve(response)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}

function patchPost(postId, postInformations) {
    postId = parseInt(postId)
    let post = mysqlController.patchPost(postId, postInformations)
    return new Promise((resolve, reject) => {
        post.then((post) => {
            resolve(post)
        })
        .catch((error) => {
            reject(error)
        })
    })
}



module.exports= {
    makeFixtures,
    getUserById,
    patchUser,
    login,
    getAllPosts,
    Delete,
    getPostById,
    deletePostById,
    patchPost
}