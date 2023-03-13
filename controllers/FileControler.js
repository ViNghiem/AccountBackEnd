
var imageModel = require('../model/ImagesModel');

var path = require('path');
var fs = require("fs");
var multer = require("multer");

const storage = multer.diskStorage({


  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {

    let typeFlife = file.mimetype.split('/')
    cb(null, file.fieldname + '-' + Date.now()+'.'+typeFlife[1])
  }
})
var upload = multer({ storage: storage })



var upload = multer({ storage: storage })
const fileController = {
  getFile: async (req,res) =>{
    console.log("reafasdf")
    res.status(500).json("nghiem")
  },


  upload: (upload.single('myImage'),async (req,res)=>{
    console.log(req.file)
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    var finalImg = {
      contentType: req.file.mimetype,
      image:  new Buffer.from(encode_image, 'base64')
    };

    console.log(finalImg,"finalImg")

    res.send(finalImg.image);
})
}


module.exports = fileController;