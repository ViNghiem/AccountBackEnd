var express = require("express");
var cors = require("cors");
var userRoute = require("./routes/admin/user");
var fileRoute = require("./routes/admin/File")
var address = require("./routes/public/address")
var productAdmim = require("./routes/admin/product")
var public = require("./routes/public/index")
var cookieParser = require('cookie-parser');
const passport = require('passport');
var bodyParser = require("body-parser");
var path = require('path')
var GoogleStrategy = require('passport-google-oidc');
const session = require('express-session');
var app = express();
var dotenv = require("dotenv");
var authRoute = require('./routes/admin/authRoute')
const passportSetup = require("./config/passport")

var http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST']
  }
});

dotenv.config();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(cookieParser());

app.use(express.static(path.join(__dirname + '/public/images')))
app.use(express.static(path.join(__dirname + '/public/stylesheets')))
// app.set('vews',path.join(__dirname, 'views'))
app.use(
  session({
    secret: process.env.JWT_ACCESS_KEY,
    resave: false,
    saveUninitialized: false,
  })
);



app.use(passport.initialize());
app.use(passport.session());

var mongoose = require("mongoose");

app.use(cors(),bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
io.on('connection', (socket) => {
  console.log('a user connected',socket.handshake.headers["sec-ch-ua"]);
});

mongoose.set('strictQuery', true)

mongoose.connect(
  process.env.MOGODB_URL
)
.then(()=>console.log('connected'))
.then(()=>{
  app.use("/",public);
  app.use("/user", userRoute);
  app.use("/files", fileRoute)
  app.use("/address",address);
  app.use("/products",productAdmim);
  app.use("/auth", authRoute);

})
.catch(e=>console.log(e));






http.listen(3020);