// const jwt = require('jsonwebtoken')




const Product = require("../../model/Product/ProductModel")
const product = require("../../model/Product/ProductModel");
const Categori = require("../../model/Category/CategoryModel")

const ProductControler = {
  addProduct: async (req, res) => {
    try {
      console.log("vinghiem",req.body)
      const  newProduct= await new Product({
        name: req.body.name,
        description: req.body.description,
        slug:req.body.slug,
        quatity:req.body.quatity,
        price:req.body.price,
        images: req.body.images,
        category:req.body.categories
      });
      const product = await newProduct.save();
      const listCategory = product.category
      console.log('product',product)

      await Promise.all(listCategory.map(async (e) => {
        await Categori.updateOne(
          { _id: e },
          { $addToSet: { listProduct: product._id } }
        );
        console.log('eeeeeeeeeeee',e)
      }));
   

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
      const product = await Product.findOne({_id:req.query.id})
      const listCategory = product.category
      await Promise.all(listCategory.map(async (e) => {
        await Categori.updateOne(
          { _id: e },
          { $pull: { listProduct: product._id } }
        );
      }));


      await Product.findByIdAndDelete(req.query.id);
      const productList = await Product.find();
      console.log(productList,"productList")
      res.status(200).json(productList)
    } catch (err) {
      // console.log(err)
      // res.status(500).json(err);
    }
  },


  updateProduct: async (req, res) => {
    try {
      console.log(req.body,"params")
      const filter = { _id: req.body.newProduct.id};
      const update = { $set: { name:req.body.newProduct.name,slug: req.body.newProduct.slug, price:req.body.newProduct.price,images: req.body.newProduct.images,description:req.body.newProduct.description } };
      const result = await Product.updateOne(filter, update);
      const newProduct = await Product.findOne(filter)
      res.status(200).json(newProduct)
    } catch (err) {
      console.log("error",err)
      res.status(500).json(err);
    }
  },




}

module.exports = ProductControler ;