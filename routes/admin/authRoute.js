const router = require("express").Router();
const passport = require("passport");
const User = require("../../model/UserModel");
const authController = require("../../controllers/Authentication/authControler")

var dotenv = require("dotenv");
dotenv.config();

const CLIENT_URL = process.env.INDEX_URL


router.get("/login/success",async (req, res) => {
  try {
    console.log('req.user',req.user)
    console.log('phien',req.isAuthenticated())
    if (req.user) {
      const user = req.user
      console.log("ggewgrehgr wjqwjegyqweqwfetuwqyiuhejiwqjeqwgewqrfetgyhuwqjequwyeqwfyegqywhje")
      const User_db = await User.findOne({email:user._json.email})
      if(User_db){
        const accessToken = await authController.generateAccessToken(User_db);
        const refreshToken = await authController.generateRefreshToken(User_db);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          // secure:true,
          path: "/",
          // sameSite: "none"
        });
        res.status(200).json({accessToken:accessToken,role:User_db.role})
      }else{
        const newUser = await new User({
          username: req.user._json.name,
          email: req.user._json.email,
          avartar: req.user._json.picture
        });
        const user = await newUser.save();
        console.log("user",user)
        const accessToken = await authController.generateAccessToken(newUser);
        const refreshToken = await authController.generateRefreshToken(newUser);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          // secure:true,
          path: "/",
          // sameSite: "none"
        });
        res.status(200).json({accessToken:accessToken,role:user.role})

      }
    }else{
      res.status(500).json({err:"ndoeu"});
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});







router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  console.log(req)
  req.logOut(() => {
    
    const cookies = Object.keys(req.cookies);
    cookies.forEach((cookie) => {
      res.clearCookie(cookie);
    });
    res.status(200).json({mess:"logout oke"});
  });
  
});

router.get("/refreshtoken", authController.requestRefreshToken);
router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));
router.get(
  "/google/callback",(req, res,next) => {
    console.log("reqssssssssssssssssssssssssssssssssssss",req)
    next();
  },
 
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/",
  })
);




router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get("/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/",
  })
);




router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/",
  })
);








module.exports = router