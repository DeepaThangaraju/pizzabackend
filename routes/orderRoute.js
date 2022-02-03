import express from 'express';
const router=express.Router();
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51KNizaSD5eCpTjLKnqKCNZELhBbt1hNLTCubJvZdLuGqB52IDeZ7ratOkDQXgaXLKVygjLlBNY9v2rkzReEhI7QV00OHkNxAq3');
import {orderModel} from "../models/ordermodel.js";
import {saveorderModel} from "../models/saveordermodel.js";
router.post('/placeorder',async (req,res)=>{

    const {token,subtotal,currentUser,cartItems}=req.body;
    try{
    const customer=await stripe.customers.create(
        {
            email:token.email,
            source:token.id

        }
   )
   const payment=await stripe.charges.create({
       amount:subtotal*100,
       currency:'inr',
       customer:customer.id,
       receipt_email:token.email
   },{
       idempotencyKey:uuidv4()
    })
    if(payment){
        const newOrder=new orderModel({
            name:currentUser.name,
            email:currentUser.email,
            userid:currentUser._id,
            orderItems:cartItems,
            orderAmount:subtotal,
            shippingAddress:{
                street:token.card.address_line1,
                city:token.card.address_city,
                country:token.card.address_country,
                pincode:token.card.address_zip
            },transactionId:payment.source.id        })
            newOrder.save()
        res.send("paid successfully")
    }else{
        res.send("Payment failed")
    }
    }

   catch(error){
      return res.status(404).send({message:'Something went wrong'+error})
    }

})

router.get("/getuserorders",async (req,res)=>{
    try{
        const orders=await saveorderModel.find({})
        res.send(orders);
    }catch(error){
        return res.status(404).json({message:error})
    }
   })
export const orderRouter=router;