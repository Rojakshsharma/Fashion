import orderModel from "../models/orderModel.js"
import userModel from '../models/userModel.js'
import Stripe from 'Stripe'

// global variables
const currency = 'inr'
const deliveryCharges=10
// gatewau initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// placing order using cod method
const placeOrder = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentmethod: "cod",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order placed" });
    } catch (error) {
        console.log("Error in placing order:", error);
        res.json({ success: false, message: error.message });
    }
};


// placing order using stripe method
const placeOrderStripe = async (req,res)=>{
   try {
    const { userId, items, amount, address } = req.body;
    const {origin} = req.headers

    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentmethod: "Stripe",
        payment: false,
        date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item)=>({
        price_data:{
            currency:currency,
            product_data:{
                name:item.name,
            },
            unit_amount:item.price*100
        },
        quantity:item.quantity
    }))

    line_items.push({
        price_data:{
            currency:currency,
            product_data:{
                name:'Delivery Charges',
            },
            unit_amount:deliveryCharges*100
        },
        quantity:1
    })

    const session = await stripe.checkout.sessions.create({
        success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:'payment'
    })

    res.json({success:true,session_url:session.url})

   } catch (error) {
    console.log("this is error")
        console.log("Error in placing order:", error);
        res.json({ success: false, message: error.message });
   } 
}

// verify strip 
const verifyStripe = async(req,res)=>{
    const {orderId,success,userId} = req.body
    console.log(orderId,success,userId)
    try {
        if (success===false) {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
        else{
           await orderModel.findByIdAndUpdate(orderId,{payment:true})
           await userModel.findByIdAndUpdate(userId,{cartData:{}})
           res.json({success:true}) 
        }
    } catch (error) {
        res.json({ success: false, message: error.message }); 
    }
}

// all orders data for admin panel
const allOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        res.json({ success: false, message: error.message });    
    } 
}

// all users data for admin panel
const userOrder = async (req,res)=>{
    try {
        const {userId} = req.body
        
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        res.json({ success: false, message: error.message }); 
    }   
}

// update order status from admin panel
const updateStatus = async (req,res)=>{
    try {
        const {orderId,status} = req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        res.json({ success: false, message: error.message });  
    }  
}

export {verifyStripe , placeOrder,placeOrderStripe ,allOrders,userOrder,updateStatus}