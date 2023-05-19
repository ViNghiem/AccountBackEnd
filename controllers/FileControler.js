
var imageModel = require('../model/ImagesModel');
var path = require('path');
var fs = require("fs");
const cloudinary = require('cloudinary').v2;

 
cloudinary.config({
  cloud_name: "dhef1t1iu",
  api_key: "584173867866189",
  api_secret: "mHUxyykyR6S3mkK6NZH0KtCyXhk"
});

const fileController = {
  getFile: async (req,res) =>{
   const data = await cloudinary.api.resources({ max_results: 500 })
    res.send(data.resources)
    console.log(data)
  },
  
  upload: async (req,res)=>{
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    res.status(200).json({ secure_url: req.file.path });

  },


  delete:async(req,res)=>{
    let data = req.body.id
    cloudinary.uploader.destroy(data, function(error, result) {
        console.log(result, error);
      });
  },


  deletes:async (req,res)=>{
    console.log("sjjhdjhsaheguiwegug",this.getData)
    console.log(req.query.data)
    let data = req.query.data
    cloudinary.api.delete_resources(data)
    .then(async (respon)=>{
      console.log(respon)
      let newdata = await cloudinary.api.resources({ max_results: 500 })
      res.json(newdata.resources)
    }).catch(function (error) {
      console.log(error);
    })
  },
  
  getImages: async (req, res) => {
    console.log(req.query)
    const file = await imageModel.findOne({name:req.query.image_name})
    console.log(file.image_path)
    fs.readFile(file.image_path, (err,imgData)=>{
      if(err){
        res.json({messege:'file không tồn tại'})
      }
       res.writeHead(200, { 'Content-Type': 'image/jpeg' })
      res.end(imgData)
    })

  }
}


module.exports = fileController;