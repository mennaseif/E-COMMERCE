import { connect } from "mongoose"



export const dbConn =connect('mongodb+srv://nodejs:ygCqd8wu3HavfwkA@cluster0.qhshd.mongodb.net/e-commerce')
.then(() =>{
    console.log("Database connected")
}).catch(() =>{
    console.log("Database error")
})