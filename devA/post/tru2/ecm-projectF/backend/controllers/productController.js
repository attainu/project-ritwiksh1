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


export {getProducts,getProductById}