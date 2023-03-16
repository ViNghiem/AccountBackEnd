var express = require("express");

var app = express();
var mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();
var userRoute = require("./routes/user");
var fileRoute = require("./routes/File")
var bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
const cors = require('cors');
mongoose.set('strictQuery', true)

app.use(express.static('uploads'))



app.get("/", function(request, response)  {
  response.send("aksjdkjaskjdaslkjdlkjkh")
});

mongoose.connect(
  process.env.MOGODB_URL
)
.then(()=>console.log('connected'))
.then(()=>{
  app.use("/user", userRoute);
  app.use("/files", fileRoute)
})
.catch(e=>console.log(e));

app.listen(3020);