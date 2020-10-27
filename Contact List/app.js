const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cors = require('cors');
const path = require('path');

var app = express();
const port = 3000;
const route = require('../contactList/routes/route');

//bodyparser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//static files
app.use(express.static(path.join(__dirname,'public')));

//cors
app.use(Cors());

//connecting with mongodb
mongoose.connect('mongodb://localhost:27017/admin',{useUnifiedTopology: true, useNewUrlParser: true});

//on erro
mongoose.connection.on('error',()=>{
     console.log("error while connecting to the database");
});
//on connection
mongoose.connection.on('connected',()=>{
    console.log("connected to the database");
});
//forwarding all routes if /api/----
app.use('/api',route);


app.listen(3000,()=>{
    console.log("Server started at port :"+port);
});