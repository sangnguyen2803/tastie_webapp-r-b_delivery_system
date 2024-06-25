require("dotenv").config();

const express = require('express')
const app = express()
const port = 3007
const bodyParser = require('body-parser')

//

const routeUrl = require('../src/routes/index')

// morgan

const morgan = require('morgan');
const connectMongoDB = require("../config/connectMongoDB");


app.use(morgan('combined'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())




// init app

app.get('/', (req, res) => res.send("Hello Tastie"))


// connect MongoDB

connectMongoDB();

// router account service

routeUrl(app);





// Listen port
// `` : type script

app.listen(port, () => console.log(`Connect sucessfully node js with express, port default : ${port}`))

