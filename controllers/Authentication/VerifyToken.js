const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log('req',req.headers)
  const token = req.headers.token;

  if (token) {
    const accessToken = token;
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {

      if (err) { 
        console.log(err)  
        res.status(403).json("Token is not valid!");
      }else{
        req.user = user;
        next();
      }
      
    });
  } else {  
    res.status(401).json("You're not authenticated");
  }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log("req.user---------------",req.params.id)
    if (req.user.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
   
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};




module.exports = {
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
};
