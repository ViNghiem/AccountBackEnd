const User = require("../model/UserModel");
const bcrypt = require("bcrypt")
const authController = require("./Authentication/authControler")
const sha256 = require("sha256")
const cloudinary = require('cloudinary').v2;
const axios = require('axios');
cloudinary.config({
  cloud_name: "dhef1t1iu",
  api_key: "584173867866189",
  api_secret: "mHUxyykyR6S3mkK6NZH0KtCyXhk"
});




function makeid(number){
  var text = "";
  var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  for(let i=0; i < number; i++ ){  
    text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
  return text;
}


function hexToBase64(hexstring) {
  let code = btoa(hexstring.match(/\w{2}/g).map(function(a) {
      return String.fromCharCode(parseInt(a, 16));
  }).join(""));

  return code.replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '');
}

function objectToQueryString(obj) {
  const keyValuePairs = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = encodeURIComponent(obj[key]);
      const keyValuePair = `${encodeURIComponent(key)}=${value}`;
      keyValuePairs.push(keyValuePair);
    }
  }

  return keyValuePairs.join('&');
}


const userController = {



  getAllUsers: async (req, res) => {
    try {
      console.log("hjsahdjsah")
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      console.log("err")
      res.status(500).json(err);
    }
  },

  getTest: async(req,res) =>{
      
   const mess = {
      'message': 'dev pancaketest sadsadasdas' 
    }

    let data =objectToQueryString(mess)
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://notify-api.line.me/api/notify',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Authorization': 'Bearer 5gQW8t02g6me83Sn1NmqdyJp8vQbqtBUD0ALXLEPDDA'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    }); 




   res.status(200).json({mess:'dasdsadsa'})



     
  },

  updateRole: async(req,res) =>{
    try {
      const id =req.body.id
      const role = req.body.state
      await User.findOneAndUpdate({_id:id}, {$set: { role:role}})
      const starte = await User.findOne({_id:id})
      console.log('starte',starte)
      res.status(200).json(starte);
    } catch (err) {
      res.status(500).json(err);
    }



  },


  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const User_db = await User.findOne({email:req.body.email})
      if(User_db){
        const mess = {
          "mess":"Email already used"
        }
        res.status(200).json(mess);
      }else {
        const newUser = await new User({
          username: req.body.username,
          email: req.body.email,
          phone:req.body.phone,
          password: hashed
        });
        const user = await newUser.save();
        res.status(200).json(user);
      }
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  
  getInfoUsers: async (req,res) =>{
      try { 
        const user = await User.findOne({ _id: req.user.id }).populate('adress')
        console.log('useruser')
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json(error);
      }
  },

  getInfoStaff: async (req,res) =>{
    try { 
      const user = await User.findOne({ _id: req.body.idStaff })
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
},

  loginUser: async (req, res) => {
    try {
      console.log(req.body.email )
      const user = await User.findOne({ email: req.body.email.toString() });
      const userPhone = await User.findOne({ phone: req.body.email.toString() });
      console.log(userPhone,"userPhone")
      console.log(user,"user")
      if (!user && !userPhone) {
        let mess = {mess: "Tai khoản không tồn tại"}
        res.status(404).json(mess);
       
      }else{
        var validPassword =''
        if(user){
          console.log("kjdhfjsdh")
          validPassword = await bcrypt.compare(
            req.body.password,
            user.password
          );
        }else{
         
          validPassword = await bcrypt.compare(
            req.body.password,
            userPhone.password
          );
        }
        if (!validPassword) {
          let mess = {mess: "Mật khẩu không chính xác"}
          res.status(404).json(mess);
        }

        if(validPassword) {
          if(user){
            let mess = "Đăng nhập thành công";
            const accessToken = await authController.generateAccessToken(user);
            console.log('accessToken',accessToken)
            const refreshToken = await authController.generateRefreshToken(user);

            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure:false,
              path: "/",
              sameSite: "strict",
            });
            
            const { password, ...others } = user._doc;
            res.status(200).json({ ...others, accessToken ,mess});
          }else if(userPhone){
            
            let mess = "Đăng nhập thành công";
            const accessToken = authController.generateAccessToken(userPhone);
            const refreshToken = authController.generateRefreshToken(userPhone);
            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure:false,
              path: "/",
              sameSite: "strict",
            });
            const { password, ...others } = userPhone._doc;
            res.status(200).json({ ...others, accessToken ,mess});
          }          
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  acount:async(req,res)=>{
   try {
    console.log(req.user)
      const user = await User.findOne({ _id:req.user.id }) 
      const toral = await user.getTotalBill()
      // console.log('user--------------',toral)
      res.status(200).json(user);
    } catch (err) {
      console.log(err)
      // res.status(500).json(err);
    }
  },

  updateProfile:async(req,res)=>{
    console.log(req.body,"body")
    const newObj = { ...req.body };
    delete newObj.id;
    console.log(newObj,"newObjs")
    User.updateOne(
      { _id: req.body.id },newObj
    )
      .then( async result => {

        const user = await User.findOne({ _id:req.body.id })
        console.log(user)
        res.status(200).json(user);
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật dữ liệu:', error);
      });
  },

  permission: async(req,res)=>{
    try {
      console.log(req)
      res.status(200).json({mess:"succes"});
    } catch (err) {
      res.status(500).json(err);
    }
  },



  zaloAuth: async (req,res) =>{
    try {
      var code_verifier = makeid(43)
      var code_challenge = hexToBase64(sha256(code_verifier))
      var url = `https://oauth.zaloapp.com/v4/permission?app_id=456333988957607221&redirect_uri=https://react-app-gray-alpha.vercel.app&code_challenge=${code_challenge}&state=yes`
      var obj = {
        "code_verifier":code_verifier,
        "code_challenge":code_challenge,
        "url":url
      }
      // console.log(obj)
    res.send(obj) 
    } catch (err) {
      res.status(500).json(err);
    }
  } 
};




module.exports = userController;