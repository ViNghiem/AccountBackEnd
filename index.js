var express = require("express");

var app = express();
var mongoose = require("mongoose");
var dotenv = require("dotenv");
const User = require("./model/UserModel");
dotenv.config();
var userRoute = require("./routes/user");
var bodyParser = require("body-parser");
const cors = require('cors');
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json())

// app.use(express.static("public"));

// app.set("view engine", "ejs");
// app.set("views", "./views");




mongoose.set('strictQuery', true)
mongoose.connect((process.env.MOGODB_URL), () => {}).then( console.log("Connected to By vi nghiem"));

// app.use(express.json());

app.get("/",async function(request, response)  {
    const user = await User.find();
    
    response.send(user)
});

app.use("/user", userRoute);

app.listen(3020);