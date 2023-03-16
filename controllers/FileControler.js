
var imageModel = require('../model/ImagesModel');

var path = require('path');
var fs = require("fs");

const fileController = {
  getFile: async (req,res) =>{
    console.log(req)
    // imagemodel.find({name: req.params.image_name}, {image_path: 1, _id: 0}).limit(1).exec((err, docs) => {
    //     if (err) {
    //         console.log(err)
    //         return res.status(500).json({message: err.message})
    //     }

    //     if (docs.length === 0) {
    //         return res.status(404).json({ message: 'No such image file' })
    //     }

    //     const imagePath = path.join(__dirname, docs[0].image_path)
    //     try {
    //         const buffer = fs.readFileSync(imagePath)
    //         const mime = fileType(buffer).mime
    //         res.writeHead(200, { 'Content-Type': mime })
    //         res.end(buffer, 'binary')
    //     } catch (error) {
    //         console.log(error.code)
    //         if (error.code === 'ENOENT') {
    //             res.status(404).json({ message: 'No such image file' })
    //         } else {
    //             res.status(500).json({ message: error.message })
    //         }
    //     }
    // })

    res.status(200).json({ message: `done` })

  },


  upload: async (req,res)=>{
    console.log(req.file)
    const reqName = req.file.filename
    const imagePath = path.join('uploads', req.file.filename)

    const model = new imageModel({
        name: reqName,
        image_path: imagePath,
        created_at: new Date()
    })
    
    model.save((err) => {
          if (err)  {
              console.log(err)
              return res.status(500).json({message: err.message})
          }
          res.status(200).json({ message: `Uploaded image "${reqName}" successfully` })
      })

  },

  getImages: async (req, res) => {
    console.log(req.query)
    const file = await imageModel.findOne({name:req.query.image_name})
    console.log(file.image_path)
    fs.readFile(file.image_path,(err,imgData)=>{
      if(err){
        res.json({messege:'file không tồn tại'})
      }
      res.writeHead(200, { 'Content-Type': 'image/jpeg' })
      res.end(imgData)
    })

  }




}


module.exports = fileController;