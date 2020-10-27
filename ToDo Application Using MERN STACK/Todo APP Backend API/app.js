require('dotenv').config()
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3001

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log("DB CONNECTED");
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use(cors());

//routes

//User Authentication Route
const authRoutes = require("./routes/Auth");
//Router handling user  
const userRoutes = require("./routes/User");
//Router to creation of Todo list
const todoRoutes = require("./routes/ToDo");
//creation of categories of  todo
const categoryRoutes = require("./routes/Categories");

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", todoRoutes);
app.use("/api", categoryRoutes);


app.get("/", (req, res) => {
  res.send({
    "Message": "Welcome to TODO APPLICATION"
  });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
module.exports = app;