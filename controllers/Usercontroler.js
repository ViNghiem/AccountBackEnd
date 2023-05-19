const User = require("../model/UserModel");
const bcrypt = require("bcrypt")
const authController = require("./authControler")
const sha256 = require("sha256")
const cloudinary = require('cloudinary').v2;

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



const userController = {



  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      console.log("err")
      res.status(500).json(err);
    }
  },

  getTest: async(req,res) =>{
      console.log("oke")
      res.status(500).json("nghiemsss");
    
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
  
    console.log(req.file,"requet")
    try {
      const salt = await bcrypt.genSalt(10);
      console.log(salt,"salt")
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
          console.log("kjdhfjsdhssssssssssssssssssssssssssssss")
          validPassword = await bcrypt.compare(
            req.body.password,
            userPhone.password
          );
        }
        
        console.log(validPassword,"kjdhfjsdhssssssssssssssssssssssssssssss")
        if (!validPassword) {
          let mess = {mess: "Mật khẩu không chính xác"}
          res.status(404).json(mess);
        }

        if(validPassword) {
        
          if(user){
            console.log("áhdjhjashd2222")
            let mess = "Đăng nhập thành công";
            const accessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshToken(user);
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
    console.log(req.user.id)
    const user = await User.findOne({ _id:req.user.id }) 
    res.status(200).json(user);
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
        console.log('Dữ liệu đã được cập nhật thành công');
        const user = await User.findOne({ _id:req.body.id }) 
        res.status(200).json(user);
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật dữ liệu:', error);
      });
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
      console.log(obj)
    res.send(obj) 
    } catch (err) {
      res.status(500).json(err);
    }
  } 
};




module.exports = userController;