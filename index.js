import express from "express";
import {connect} from "./connection.js";
import { pizzaModel } from "./models/pizzamodel.js";
import {pizzaRouter} from "./routes/pizzaRoute.js";
import {userRouter} from "./routes/userRoute.js";
import {orderRouter} from "./routes/orderRoute.js";
import { saveorderRouter } from "./routes/saveorderRoute.js";
import dotenv from 'dotenv'

connect();
dotenv.config()
const app=express();

app.use(express.json());

const PORT=process.env.PORT;


app.get('/',(req,res)=>{
    res.send("server started")
});

app.use('/api/pizzas',pizzaRouter)
app.use('/api/user',userRouter)
app.use('/api/orders',orderRouter)
app.use('/api/placeorders',saveorderRouter)




app.listen(PORT,()=>console.log("App connected in",PORT));