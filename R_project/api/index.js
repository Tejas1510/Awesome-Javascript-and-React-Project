const express = require ("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql')

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:"reactbe"
});


// app.get("/",(req,res) => {

//      const iq="INSERT INTO login(email,password) VALUES ('shavin','mathur');"
//      db.query(iq,(err,result) => {
//          res.send("hello  bro");
//     })
    
// });
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extends:true}))

app.post("/api/insert",(req,res)=>{
    const email = req.body.email
    const password = req.body.password

     
    const iq="INSERT INTO login(email,password) VALUES (?,?);"
    db.query(iq,[email,password],(err,result) => {
        console.log(result)

    });
});

app.listen(3001,()=>
{
    console.log("working")
});




