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
const passportSetup = require("./config/passport")
const { Liquid } = require('liquidjs')
const {Setcookey} = require('./miderwhere/statistical')
const MongoDBStore = require('connect-mongodb-session')(session);



var http = require('http').createServer(app);
app.use(cors())


// const io = require('socket.io')(http, {
//   cors: {
//     origin: '*', 
//     methods: "GET,POST,PUT,DELETE",
//     // credentials: true,
//   }
// });
console.log('----------------------------')

dotenv.config();

const engine = new Liquid({
  extname: '.liquid',
  root: __dirname,
  layouts: './layout',
 
})

app.engine('liquid', engine.express())
app.set('views', [ './views', './views/index','./views/layout','./views/Product','./views/Categories','./views/Checkout'] )
app.set('view engine', 'liquid')



engine.registerFilter('vnd', (value) => {
  const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  return formattedValue;
});

engine.registerFilter('fomatTime', (value) => {
  const vietnamTime = new Date(value);

  const formattedTime = vietnamTime.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

return formattedTime

});



engine.registerFilter('first', (value) => {
  return value[0];
});

const store = new MongoDBStore({
  uri: process.env.MOGODB_URL,
  collection: 'sessions',
});


app.use(cookieParser());
app.set("trust proxy", 1)
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
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    }
  })
);



app.use(passport.initialize());
app.use(passport.session());

var mongoose = require("mongoose");

app.use(cors(),bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

// io.on('connection', (socket) => {
//   console.log('a user connected',socket.handshake.headers["sec-ch-ua"]);
// });

mongoose.set('strictQuery', true)

mongoose.connect(
  process.env.MOGODB_URL
)
.then(()=>console.log('connected'))
.then(()=>{
  app.use("/",Setcookey,public);
  // app.get('/', function (req, res) {
  //   const todos = ['fork and clone', 'make it better', 'make a pull request']
  //   res.render('index', {todos:todos})
  // })


  app.use("/user", userRoute);
  app.use("/files", fileRoute)
  app.use("/address",address);
  app.use("/products",productAdmim);
  app.use("/auth", authRoute);
  app.use("/admin/categories", categori);
  app.use("/admin/orders", Orders);

  app.use(function(req, res, next) {
    res.render('Err404notfoud',{template:{}});
  });
  
})
.catch(e=>console.log(e));




http.listen(3020);