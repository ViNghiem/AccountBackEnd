const Categori = require("../../model/Category/CategoryModel");
const mongoose = require('mongoose');


const CategoriController = {
  GetAll: async (req, res) => {
    try {
        console.log("da nhan requed")
      const ListCate = await Categori.find();
      console.log(ListCate)
      res.status(200).json({data:ListCate});
    } catch (err) {
      console.log("err")
      res.status(500).json(err);
    }
  },

  CreatCategori: async (req, res) => {
    try {
      console.log(req.body)
      
      const newCate = await new Categori({
        name: req.body.name,
        slug:req.body.slug,
        Image: req.body.Image,
        description:req.body.description,
        listProduct: req.body.listProduct,
      });

    const cate = await newCate.save();
      res.status(200).json(cate);
    } catch (err) {
      console.log("err")
      res.status(500).json(err);
    }
  },

  AddProduct: async (req, res) => {
    try {
      console.log(req.body)
      const idcategory = req.body.idcategory
      const idproduct = mongoose.Types.ObjectId(req.body.idproduct)
      const Category = await Categori.findOne({_id:idcategory});
      const listProduct = Category.listProduct
      if (listProduct.includes(idproduct)) {
        res.status(200).json({mess:'sản phẩm đã có trong danh mục'});
      } else {
        console.log(listProduct,"listProduct")
        listProduct.push(req.body.idproduct) 
        const newlist = [...listProduct];

        console.log(listProduct,"listProduct")
        console.log(idproduct,"idproduct")
       
        Categori.updateOne(
          { _id: idcategory },
          { $set: { listProduct: newlist  } } 
        ).then( async result => {
          const Category = await Categori.findOne({_id:idcategory});
          console.log(Category)
          res.status(200).json(Category);
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật dữ liệu:', error);
        });

      }
    } catch (err) {
      console.log("err",err)
      res.status(500).json(err);
    }
  }

  


}

module.exports = CategoriController;