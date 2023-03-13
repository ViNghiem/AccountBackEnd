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




var imageModel = require('./model/ImagesModel');


app.get("/", function(request, response)  {
  response.send("aksjdkjaskjdaslkjdlkjkh")
});



mongoose.connect(process.env.MOGODB_URL, () => {
  
  app.listen(3020);
  console.log("CONNECTED TO MONGO DB");
  app.use("/user", userRoute);
  app.use("/files", fileRoute);
  
  // app.post('/uploadphoto', upload.single('picture'), (req, res) => {
  //   console.log(req.file)
  //   var img = fs.readFileSync(req.file.path);
  //   var encode_image = img.toString('base64');
    
  //   // Define a JSONobject for the image attributes for saving to database
  
  //   var finalImg = {
  //     contentType: req.file.mimetype,
  //     image:  new Buffer.from(encode_image, 'base64')
  //   };

  //   console.log(finalImg,"finalImg")

  //   res.send(finalImg.image);
  // })



});



