var express = require("express");

var app = express();
var mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();


app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000);
mongoose.set('strictQuery', true)
mongoose.connect((process.env.MOGODB_URL), () => {
    console.log("Connected to By vi nghiem");
});



app.get("/", function(request, response)  {
    response.send("aksjdkjaskjdaslkjdlkjkh")
});

