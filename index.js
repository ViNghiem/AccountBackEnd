var express = require("express");
var cors = require("cors");
var userRoute = require("./routes/user");
var fileRoute = require("./routes/File")
var address = require("./routes/address")
var product = require("./routes/product")
var index = require("./routes/index")



var bodyParser = require("body-parser");
var path = require('path')
var Mixpanel = require('mixpanel');
var sdk = require('api')('@mixpaneldevdocs/v3.18.1#3m1grbrkzq3tprz');
var mixpanel = Mixpanel.init('e0fbc2b8e09857f1d62904f0eea9e3c1');
var app = express();
var dotenv = require("dotenv");
var http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

dotenv.config();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static(path.join(__dirname + '/public/images')))
// app.set('vews',path.join(__dirname, 'views'))



var mongoose = require("mongoose");

app.use(cors(),bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
io.on('connection', (socket) => {
  console.log('a user connected',socket.handshake.headers["sec-ch-ua"]);
});

mongoose.set('strictQuery', true)
// app.use(express.static('uploads'))
mongoose.connect(
  process.env.MOGODB_URL
)
.then(()=>console.log('connected'))
.then(()=>{
  app.use("/",index);
  app.use("/user", userRoute);
  app.use("/files", fileRoute)
  app.use("/address",address);
  app.use("/products",product);
})
.catch(e=>console.log(e));

http.listen(3020);