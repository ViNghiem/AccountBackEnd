// const jwt = require('jsonwebtoken')




const Product = require("../../model/Product/ProductModel")
const product = require("../../model/Product/ProductModel");
const ProductControler = {
  addProduct: async (req, res) => {
    try {
      console.log("vinghiem")
      const  newProduct= await new Product({
        name: req.body.name,
        description: req.body.description,
        slug:req.body.slug,
        quatity:req.body.quatity,
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

  getAllProduct: async (req, res) => {
    try {
      const  listProduct= await Product.find();
      res.status(200).json(listProduct)
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  getProduct: async (req, res) => {
    try {   
      const product= await Product.findOne({_id:req.query.product.id})
      res.status(200).json(product)
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      console.log(req.query.id,"params")
      await Product.findByIdAndDelete(req.query.id);
      const productList = await Product.find();
      console.log(productList,"productList")
      // const product= await Product.findOne({_id:req.query.product.id})
      res.status(200).json(productList)
    } catch (err) {
      // console.log(err)
      // res.status(500).json(err);
    }
  },


  updateProduct: async (req, res) => {
    try {
      console.log(req.query.id,"params")
      // await Product.findByIdAndDelete(req.query.id);
      // const productList = await Product.find();
      // console.log(productList,"productList")
      // const product= await Product.findOne({_id:req.query.product.id})
      res.status(200).json("da nhan requed")
    } catch (err) {
      // console.log(err)
      // res.status(500).json(err);
    }
  },




}

module.exports = ProductControler ;