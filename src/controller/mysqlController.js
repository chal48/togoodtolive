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

function createUser(user){
    if (user.email != null && user.password != null && isUserInDB(user.email)){
        SQLRequest(`INSERT INTO users (email, password) VALUES ("${user.email}", "${user.password}")`)
        .then((request)=>{
            if (request.affectedRows != 0){
                return
            }else{
                console.log('nope')
            }
        })
    }
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

async function isUserInDB(username){
    let usernameSanitized = databaseModel.connection.escape(username)
    let isUserInDB = await SQLRequest(`SELECT id FROM users WHERE email = ${usernameSanitized}`)
    if (isUserInDB.length == 0){
        return false
    }else{
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

module.exports= {
    getAllUsers,
    createUser,
    createPost,
    getUserById
}