import express, { request } from "express";
import { userModel } from "../models/usermodel.js";
const router=express.Router();

router.post("/register",async (req,res)=>{

    const {name,email,password}=req.body;

    const newUser=new userModel({name,email,password})

    try{
        newUser.save()
        res.send("registered successfully");
    }catch(error){
        return res.status(400).send({message:error})
    }
 
})

router.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try{
    const user=await userModel.find({email,password})
    if(user.length>0){
        const currentUser={
            name:user[0].name,
            email:user[0].email,
            isAdmin:user[0].isAdmin,
            _id:user[0]._id
        }
        res.send(currentUser)
    }
    else{
        return res.status(404).send({message:"Login failed"})
    }
    }catch(error){
        return res.status(404).send({message:"Something went wrong"})
    }
})

router.get("/getallusers",async (req,res)=>{
    try{
        const users=await userModel.find({})
        res.send(users)
     }catch(error){
        return res.status(400).json({message:error})
     }
})

router.post("/deleteuser",async (req,res)=>{
    const userid=req.body.userid
    try{
        await userModel.findOneAndDelete({_id:userid})
        res.send("pizza deleted successfully")
    }catch(error){
       return res.status(400).json({message:error})
    }
})


export const userRouter=router;