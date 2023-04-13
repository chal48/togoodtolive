const databaseModel = require('../model/databaseModel')

databaseModel.connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to DB!');
});

function getAllUsers(){
}

module.exports= {
    getAllUsers
}