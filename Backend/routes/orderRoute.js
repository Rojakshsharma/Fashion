import express from 'express'
import {placeOrder,placeOrderStripe,allOrders,userOrder,updateStatus, verifyStripe} from '../controllers/orderControllers.js'
import adminAuth from '../middleware/adminAutho.js'
import authUser from '../middleware/auth.js' 
const orderRouter = express.Router()

// admin features
orderRouter.post('/list', adminAuth ,allOrders)
orderRouter.post('/status', adminAuth ,updateStatus)

// payment features
orderRouter.post('/place', authUser,placeOrder)
orderRouter.post('/stripe', authUser,placeOrderStripe)

// user feature
orderRouter.post('/userorders',authUser,userOrder)

// verify method
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter