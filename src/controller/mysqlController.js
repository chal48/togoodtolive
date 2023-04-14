const databaseModel = require('../model/databaseModel')

databaseModel.connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to DB!');
});

async function SQLRequest(query) {

    return new Promise((resolve, reject) => {
        databaseModel.connection.query(query, (error, results) => {
            if (error) {
                reject(new Error(error));
                console.log(error)
            }
            resolve(results);
        })
    })

}

function getAllUsers() {

}

function createUser(user) {
    if (user.email != null && user.password != null && isUserInDB(user.email)) {
        SQLRequest(`INSERT INTO users (email, password) VALUES ("${user.email}", "${user.password}")`)
            .then((request) => {
                if (request.affectedRows != 0) {
                    return
                } else {
                    console.log('nope')
                }
            })
    }
}

function patchUser(userId, user) {
    return new Promise((resolve, reject) => {
        SQLRequest(`UPDATE users SET email = "${user.email}", password = "${user.password}" WHERE id = ${userId}`)
        .then((request)=>{
            if (request != undefined){
                let user = request
                resolve(user)
            }else{
                resolve({
                    "error" : "No users found with id : "+ userId
                })
            }
        })
    })
}

function createPost(post) {
    if (post.title != null && post.startDate != null && post.startPrice && post.userId != null && post.content != null) {
        let titleSanitized = databaseModel.connection.escape(post.title)
        let contentSanitized = databaseModel.connection.escape(post.content)

        SQLRequest(`INSERT INTO posts (email, password) VALUES ("${user.email}", "${user.password}")`)
            .then((request) => {
                if (request.affectedRows != 0) {
                    return
                } else {
                    console.log('nope')
                }
            })
    }
}

async function isUserInDB(username) {
    let usernameSanitized = databaseModel.connection.escape(username)
    let isUserInDB = await SQLRequest(`SELECT id FROM users WHERE email = ${usernameSanitized}`)
    if (isUserInDB.length == 0) {
        return false
    } else {
        return true
    }
}

function getUserById(userId){
    return new Promise((resolve, reject) => {
        SQLRequest(`SELECT * FROM users WHERE id = ${userId}`)
        .then((request)=>{
            //vérifie si la requete quelequechose
            if (request[0] != undefined){
                let user = request[0]
                resolve(user)
            }else{
                resolve({
                    "error" : "No users found with id : "+ userId
                })
            }
        })
    })
}

function getUserById(userId) {
    return new Promise((resolve, reject) => {
        SQLRequest(`SELECT * FROM users WHERE id = ${userId}`)
            .then((request) => {
                //vérifie si la requete renvoie quelequechose
                if (request[0] != undefined) {
                    let user = request[0]
                    resolve(user)
                } else {
                    resolve({
                        "error": "No users found with id : " + userId
                    })
                }
            })
    })
}

function login(email) {
    return new Promise((resolve, reject) => {
        SQLRequest(`SELECT password FROM users WHERE email = "${email}"`)//password (objet)
            //permet de trouver le password
            .then((request) => {
                if (request[0] != undefined) {
                    resolve(request[0])
                } else {
                    resolve({
                        "error": "No users found with this email: " + email
                    })
                }
            })
    })
}

function Delete(userId) {
    return new Promise((resolve, reject) => {
        SQLRequest(`DELETE FROM users WHERE id = "${userId}"`)
            .then((request) => {
                if (request.affectedRows != 0) {
                    resolve({})
                } else {
                    resolve({
                        "error": "Can not delete the user with the id :" + userId
                    })
                }
            })
    })
}
function insertPost(post) {
    return new Promise((resolve,reject)=>{
        if (post.title != null && post.content != null && post.startDate && post.startPrice != null && post.userId != null) {
            let endDate
            let endPrice
            if (post.endDate == undefined) {
                endDate = null
            } else {
                endDate = post.endDate
            }
            if (post.endPrice == undefined) {
                endPrice = null
            } else {
                endPrice = post.endPrice
            }
            if (post.startDate instanceof Date) {
    
                const Date = `${post.startDate.getFullYear()}-${(post.startDate.getMonth() + 1).toString().padStart(2, '0')}-${post.startDate.getDate().toString().padStart(2, '0')} ${post.startDate.getHours().toString().padStart(2, '0')}:${post.startDate.getMinutes().toString().padStart(2, '0')}:${post.startDate.getSeconds().toString().padStart(2, '0')}`;
            } else {
                // date is invalid, handle the error
                console.error('Invalid start date:', post.startDate);
            }
            SQLRequest(`INSERT INTO posts (title, content, start_date, end_date, start_price, end_price, user_id) VALUES ("${post.title}", "${post.content}", "${post.startDate}", "${post.endDate}", "${post.startPrice}","${post.endPrice}", "${post.userId}")`)
            .then((request) => {
                if (request.affectedRows != 0) {
                    resolve({})
                } else {
                    resolve({
                        "error": "Can't insert post"
                    })
                }
            })
        }
    })
}

function getAllPosts() {
    return new Promise((resolve, reject) => {
        SQLRequest(`SELECT * FROM posts`)
        .then((request)=>{
            if (request != undefined){
                let posts = request
                resolve(posts)
            }else{
                resolve({
                    "error" : "No post found"
                })
            }
        })
    })
}

function getPostById(postId) {
    return new Promise((resolve, reject) => {
        SQLRequest(`SELECT * FROM posts WHERE id = ${postId}`)
        .then((request)=>{
            if (request[0] != undefined){
                let post = request[0]
                resolve(post)
            }else{
                resolve({
                    "error" : "No post found with id : "+ postId
                })
            }
        })
    })
}

function deletePostById(postId) {
    return new Promise((resolve, reject) =>{
        SQLRequest(`DELETE FROM posts WHERE id = "${postId}"`)
        .then((request)=>{
            if (request.affectedRows != 0){
                resolve({})
            }else{
                resolve({
                    "error" : "Can not delete the post with the id :" + postId
                })
            }
        })
    })
}

function patchPost(postId, postInformations) {
    return new Promise((resolve, reject) => {
        SQLRequest(`UPDATE posts SET title = "${postInformations.title}", start_date = "${postInformations.start_date}", end_date = "${postInformations.end_date}", content = "${postInformations.content}", start_price = "${postInformations.start_price}", end_price = "${postInformations.end_price}", user_id = "${postInformations.user_id}" WHERE id = ${postId}`)
        .then((request)=>{
            if (request != undefined){
                let user = request
                resolve(user)
            }else{
                resolve({
                    "error" : "No post found with id : "+ postId
                })
            }
        })
    })
}

function deletePostById(postId) {
    return new Promise((resolve, reject) =>{
        SQLRequest(`DELETE FROM posts WHERE id = "${postId}"`)
        .then((request)=>{
            if (request.affectedRows != 0){
                resolve({})
            }else{
                resolve({
                    "error" : "Can not delete the post with the id :" + postId
                })
            }
        })
    })
}

module.exports= {
    getAllUsers,
    patchUser,
    getAllPosts,
    createPost,
    getUserById,
    login,
    Delete,
    insertPost,
    getPostById,
    deletePostById,
    patchPost
}