import express from "express";
import { saveorderModel } from "../models/saveordermodel.js";

const router=express.Router();

router.post("/saveorder",(req,res)=>{
    const {name,quantity,varient,price}=req.body;
    const orderedItem=new saveorderModel({name,quantity,varient,price})
    try{
       orderedItem.save()
       res.send("Ordered saved successfully")
    }catch(error){
       return res.status(400).json({message:error})
    }
})

router.get("/getallorders",async (req,res)=>{
try{
   const orders=await saveorderModel.find({})
   res.send(orders)
}catch(error){
   return res.status(400).json({message:error})
}
})

export const saveorderRouter=router;