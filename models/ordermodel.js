import mongoose from 'mongoose'

const orderSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },orderItems:[],
    shippingAddress:{type:Object},
    orderAmount:{type:Number,required:true},
    isDelivered:{type:Boolean,required:true},
    transactionId:{type:String,required:true}

},{
    timestramps:true
}
)

export const orderModel=mongoose.model('orders',orderSchema)