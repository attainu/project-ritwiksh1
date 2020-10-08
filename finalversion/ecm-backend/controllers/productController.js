import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";


// get all products
const getProducts = asyncHandler(async (req,res)=>{
    const products = await Product.find({});
    // throw new Error(`Some Error`)
        res.json(products);


})


const getProductById = asyncHandler(async (req,res)=>{
    // if(mongoose.isValidObjectId(req.params.id)===false){
    //    return res.status(404).json({ message: 'Enter a valid product Id' })
    // }

    const product = await Product.findById(req.params.id);
    // console.log("product>>>>>>>>> ", product);

    if (product) {
      res.json(product);
    } else {
      res.status(404)
      throw new Error('Product not Found');
    }

})



//delete product by admin
const deleteProduct = asyncHandler(async (req,res)=>{
  const product = await Product.findById(req.params.id);
  // console.log("product>>>>>>>>> ", product);

  if (product) {
    await product.remove()
    res.json({message:"Product Removed Successfully"})
  } else {
    res.status(404)
    throw new Error('Product not Found');
  }

})

//add product by admin
const createProduct = asyncHandler(async (req,res)=>{
  const product = new Product({
    name:'Sample name',
    price:0,
    user:req.user._id,
    image:'/images/sample.jpg',
    brand:'Sample Brand',
    category:'Sample Category',
    countInStock:0,
    numReviews:0,
    description:'Sample Description'
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)

})


//update product
// api/products/:id
const updateProduct = asyncHandler(async (req,res)=>{
 const {name,price,description,image,brand,category,countInStock} = req.body

 const product= await Product.findById(req.params.id)
 if(product){
  product.name= name
  product.price= price
  product.description=description 
  product.image=image 
  product.brand= brand
  product.category= category
  product.countInStock= countInStock
  
  
  
  const updatedProduct = await product.save()
   res.json(updatedProduct)

 }else{
   res.status(404)
   throw new Error('product not found')
 }


})


export {getProducts,getProductById,deleteProduct,createProduct,updateProduct}