
const cookieParser = require('cookie-parser');

const Pixcel = require("../model/modelPixcel")

const Setcookey = async (req, res, next) => {
  const _Mystore_key = req.cookies._Mystore_key
  if(_Mystore_key){
    next()
  }else{
    const pixcel = await new Pixcel()
    const keyUser = await pixcel.save();
    res.cookie('_Mystore_key',keyUser._id.toString())
    next()
  }
  
 
};

module.exports = {
  Setcookey
};
