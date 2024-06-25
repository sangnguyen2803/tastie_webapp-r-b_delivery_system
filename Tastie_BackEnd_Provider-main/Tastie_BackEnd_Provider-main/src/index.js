require("dotenv").config();

const express = require('express')
const app = express();
const bodyParser = require('body-parser')

//



// morgan

const morgan = require('morgan');
const indexRoute = require("./routes");


app.use(morgan('combined'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())


//


indexRoute(app);



app.listen(3008, ()=> console.log("Start server provider with port : 3008"))


