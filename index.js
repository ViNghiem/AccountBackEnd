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
var categori = require('./routes/admin/Categories')
var Orders = require('./routes/admin/Order')
var ShippingRoute = require('./routes/admin/Shipping')
var Search = require('./routes/admin/SearchRouter')

const passportSetup = require("./config/passport")
const { Liquid } = require('liquidjs')
const {Setcookey} = require('./miderwhere/statistical')
const MongoDBStore = require('connect-mongodb-session')(session);
const WebSocket = require('ws');
const socketServer = require('./socket/Seversocket')


var http = require('http').createServer(app);

const corsOptions = {
  origin: '*',
  methods: '*',
  allowedHeaders: '*',
};

app.use(
  cors({
    origin: [
      "https://my-store-theta-lyart.vercel.app",
      "http://localhost:3000",
      "http://localhost:3020",
      'https://web2s.storedemo.vn'
    ],
    methods: ["PUT", "GET", "HEAD", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.set("trust proxy", 1)


app.use(cookieParser());
// const io = require('socket.io')(http, {
//   cors: {
//     origin: '*', 
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   }
// }); 


dotenv.config();

const engine = new Liquid({
  extname: '.liquid',
  root: __dirname,
  layouts: './layout',
 
})

app.engine('liquid', engine.express())
app.set('views', [ './views','./views/Search', './views/index','./views/layout','./views/Product','./views/Categories','./views/Checkout'] )
app.set('view engine', 'liquid')



engine.registerFilter('vnd', (value) => {
  const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  return formattedValue;
});

engine.registerFilter('first', (value) => {
  return value[0];
});

const store = new MongoDBStore({
  uri: process.env.MOGODB_URL,
  collection: 'sessions',
});



app.use(express.static(path.join(__dirname + '/public/images')))
app.use(express.static(path.join(__dirname + '/public/stylesheets')))
// app.set('vews',path.join(__dirname, 'views'))
app.use(
  session({
    secret: process.env.JWT_ACCESS_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      // sameSite: "none",
      // secure: true, 
      // maxAge: 1000 * 60 * 60,
      // httpOnly: true,
    }
  })
);

const setheader =(req,res,next) =>{
  // https://my-store-theta-lyart.vercel.app
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
  next()
}

app.use(passport.initialize());
app.use(passport.session());

var mongoose = require("mongoose");
const { requestRefreshToken } = require("./controllers/Authentication/authControler");

app.use(cors(),bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));



mongoose.set('strictQuery', true)

mongoose.connect(
  process.env.MOGODB_URL
)
.then(()=>console.log('connected'))
.then(()=>{
  app.use("/",Setcookey,public);

  app.use("/user",setheader, userRoute);
  app.use("/files",setheader, fileRoute)
  app.use("/address",setheader,address);
  app.use("/products",setheader,productAdmim);
  app.use("/auth",setheader, authRoute);
  app.use("/admin/categories",setheader, categori);
  app.use("/admin/orders",setheader, Orders);
  app.use("/admin/shipping", ShippingRoute);

  app.use(function(req, res, next) {
    res.render('Err404notfoud',{template:{}});
  });
  
})
.catch(e=>console.log(e));
http.listen(3020);


socketServer(http)
