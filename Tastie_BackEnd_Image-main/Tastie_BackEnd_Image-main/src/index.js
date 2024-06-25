const express = require('express');
const connectMongoDB = require('../config/connectMongoDB');
const indexRoute = require('./routes');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')

// morgan

const morgan = require('morgan');


app.use(morgan('combined'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())

//




app.use(cors());



connectMongoDB()
indexRoute(app)

app.listen(3777, ()=> console.log("Start server provider with port : 3777"))