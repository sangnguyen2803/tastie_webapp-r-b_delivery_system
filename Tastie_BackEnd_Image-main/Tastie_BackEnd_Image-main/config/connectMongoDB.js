require("dotenv").config();
const mongoose = require('mongoose')

const url = `mongodb+srv://tastie_backend:2L7ER3b1RA6e2Xnj@tastie-backend-notifica.xz6oa.mongodb.net/Tastie_BackEnd_Notification`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectMongoDB = () => {
    mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
}


module.exports = connectMongoDB