const databaseModel = require('../model/databaseModel')

databaseModel.connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to DB!');
});

async function SQLRequest(query){

    return new Promise((resolve, reject)=>{
        databaseModel.connection.query(query, (error, results)=> {
            if (error){
                reject(new Error(error));
                console.log(error)
            } 
            resolve(results);
        })
    })

}

function getAllUsers(){
    
}

function patchUser(userId, user) {
    return new Promise((resolve, reject) => {
        SQLRequest(`UPDATE users SET email = "${user.email}", password = "${user.password}" WHERE id = ${userId}`)
        .then((request)=>{
            //vérifie si la requete quelequechose
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

function createUser(user){
    let userExist = isUserInDB(user.email)
    userExist
    .then((isInDB)=>{
        console.log(user)
        return new Promise(function(resolve, reject) {
            if (user.email != null && user.password != null && isInDB){
                SQLRequest(`INSERT INTO users (email, password) VALUES ("${user.email}", "${user.password}")`)
                .then((request)=>{
                    if (request.affectedRows != 0){
                        console.log('created')
                        resolve({})
                    }else{
                        console.log('error')
                        resolve({
                            "error" : "Unable to create user"
                        })
                    }
                })
            }else{
                console.log('already created')
                resolve({
                    "error" : "User already exists"
                })
            }
        })
    })
}

function createPost(post){
    if (post.title != null && post.startDate != null && post.startPrice && post.userId != null && post.content != null){
        let titleSanitized = databaseModel.connection.escape(post.title)
        let contentSanitized = databaseModel.connection.escape(post.content)

        SQLRequest(`INSERT INTO posts (email, password) VALUES ("${user.email}", "${user.password}")`)
        .then((request)=>{
            if (request.affectedRows != 0){
                return
            }else{
                console.log('nope')
            }
        })
    }
}

function isUserInDB(username){
    return new Promise((resolve, reject)=>{
        let usernameSanitized = databaseModel.connection.escape(username)
        let isUserInDB = SQLRequest(`SELECT id FROM users WHERE email = ${usernameSanitized}`)
        isUserInDB
        .then((request)=>{
            if (request.length == 0){
                console.log(true)
                resolve(false)
            } else {
                console.log(false)
                resolve(true)
            }
        })
    })
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

module.exports= {
    getAllUsers,
    createUser,
    createPost,
    getUserById,
    patchUser
}