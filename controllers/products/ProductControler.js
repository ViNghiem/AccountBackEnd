// const jwt = require('jsonwebtoken')




const Product = require("../../model/Product/ProductModel")
const product = require("../../model/Product/ProductModel");
const ProductControler = {
  addProduct: async (req, res) => {



    try {
      const  newProduct= await new Product({
        name: req.body.name,
        description: req.body.description,
        slug:req.body.slug,
        price:req.body.price,
        images: req.body.images
      });
      const product = await newProduct.save();
      res.status(200).json(product)
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },







}

module.exports = ProductControler ;