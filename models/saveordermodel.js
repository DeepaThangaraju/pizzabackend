import mongoose from 'mongoose';

const saveorderSchema=mongoose.Schema(
    {
      name:{type:String,required:'true'},
      quantity:{type:Number,required:'true'},
      varient:{type:String,required:'true'} ,
      price:{type:Number,required:'true'} 
    },{
        timestramps:true
    }
)

export const saveorderModel=mongoose.model('saveorders',saveorderSchema)
