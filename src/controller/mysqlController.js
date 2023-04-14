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
    return new Promise(function(resolve, reject) {
        if (user.email != null && user.password != null && isInDB){
            SQLRequest(`INSERT INTO users (email, password) VALUES ("${user.email}", "${user.password}")`)
            .then((request)=>{
                if (request.affectedRows != 0){
                    resolve({})
                }else{
                    resolve({
                        "error" : "Unable to create user"
                    })
                }
            })
        }else{
            resolve({
                "error" : "User already exists"
            })
        }
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

// function isUserInDB(email){
//     return new Promise((resolve, reject)=>{
//         let isUserInDB = SQLRequest(`SELECT id FROM users WHERE email = "${email}"`)
//         isUserInDB
//         .then((request)=>{
//             if (request.length == 0){
//                 resolve(false)
//             } else {
//                 resolve(true)
//             }
//         })
//     })
// }

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