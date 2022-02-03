import express from 'express';
import {pizzaModel} from '../models/pizzamodel.js';

const router=express.Router();

router.get("/getallpizzas",async (req,res)=>{
 try{
     const pizzas=await pizzaModel.find({})
     res.send(pizzas);
 }catch(error){
     return res.status(404).json({message:error})
 }
})

router.post("/addpizzas",async (req,res)=>{
    const pizza=req.body.pizza;
    try{
    const newPizza=new pizzaModel({
        name:pizza.name,
        image:pizza.image,
        varient:['small','medium','large'],
        description:pizza.description,
        category:pizza.category,
        prices:[pizza.prices]
    })

    await newPizza.save();
    res.send("pizza added successfully")
}catch(error){
    return res.status(400).json({message:error})

}
})

router.post("/getpizzabyid",async(req,res)=>{
    const pizzaid=req.body.pizzaid;
    try{
       const pizza=await pizzaModel.findOne({_id:pizzaid});
       res.send(pizza);
    }catch(error){
        return res.status(404).json({message:error})

    }
})


router.post("/editpizza",async(req,res)=>{
    const editedpizza=req.body.editedPizza;
    try{
     const pizza=await pizzaModel.findOne({_id:editedpizza._id})
     pizza.name=editedpizza.name
     pizza.description=editedpizza.description
     pizza.category=editedpizza.category
     pizza.image=editedpizza.image
     pizza.prices=[editedpizza.prices]

     await pizza.save()
     res.send("Edited successfully")
    }catch(error){
    return res.status(400).json({message:error})
    }
})

router.post("/deletepizza",async (req,res)=>{
     const pizzaid=req.body.pizzaid
     try{
         await pizzaModel.findOneAndDelete({_id:pizzaid})
         res.send("pizza deleted successfully")
     }catch(error){
        return res.status(400).json({message:error})
     }
})

export const pizzaRouter=router;