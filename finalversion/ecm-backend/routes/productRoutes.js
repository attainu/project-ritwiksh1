
import express from "express";

const router = express.Router();
import {getProducts,getProductById,deleteProduct, updateProduct, createProduct} from '../controllers/productController.js'
import {protect,admin} from '../middleware/authMiddleware.js'


// get all products
router.route('/').get(getProducts).post(protect,admin,createProduct)
// router.get("/",getProducts);

// get single product
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)
// router.get("/:id", getProductById);

export default router;







// import express from 'express';

// import asyncHandler from 'express-async-handler';
// const router= express.Router();
// import Product from '../models/productModel.js'

// //Get all Products
// router.get('/',asyncHandler(async (req,res)=>{
//     const products= await Product.find({})
//     res.json(products)

// }))

// //Get Single Products
// router.get('/:id',asyncHandler(async (req,res)=>{

//     const product= await Product.findById({_id:req.params.id})
//     if(product){

//        return res.json(product)
//     }
//     res.status(404).json({message:"Product not found"})

// }))

// export default router

// import mongoose from 'mongoose'
