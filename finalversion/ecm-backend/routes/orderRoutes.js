import express from "express";

const router = express.Router();
import {addOrderItems,getOrderById, updateOrderToPaid,getMyOrders,getOrders} from '../controllers/orderController.js'
import {protect,admin} from '../middleware/authMiddleware.js'


router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
//get orders of loggedin users
router.route('/myorders').get(protect,getMyOrders)

//order details by id
router.route('/:id').get(protect,getOrderById)

//update to paid
router.route('/:id/pay').put(protect,updateOrderToPaid)



export default router;



