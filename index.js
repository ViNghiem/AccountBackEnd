var express = require("express");

var app = express();
var mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();
var userRoute = require("./routes/user");
var bodyParser = require("body-parser");
const cors = require('cors');
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json())


console.log(process.env.MOGODB_URL)
mongoose.set('strictQuery', true)
mongoose.connect((process.env.MOGODB_URL), () => {console.log("vlc")}).then( console.log("Connected to By vi nghiemw"));

app.get("/", function(request, response)  {
    response.send("aksjdkjaskjdaslkjdlkjkh")
});

app.use("/user", userRoute);

app.listen(3020);