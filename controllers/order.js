const cart = require('./cart')
const User=require('../models/user.js')
const order=require('../models/order.js')
const Order = require('../models/order.js')
const Book = require('../models/book.js')
const myCache=require('../util/node-cache.js')
const sequelize = require('../util/sequelize.js')

exports.getOrders=async(req,res,next)=>{
    try{
    const orders=await Order.findAll({where:{userId:req.userId},include:Book})
    if(!orders.length){
        const error=new Error('the user has no order')
        error.statusCode=404
        throw error 
    }
    res.status(200).json({message:'the orders are here',orders:orders})
}catch(err){
    if(!err.statusCode){
        err.statusCode=500
    }
    next(err)
}
}

exports.placeOrder=async(req,res,next)=>{
    try{
    const user=await User.findByPk(req.userId)
    if(!user){
        const error=new Error('the user is not found')
        error.statusCode=404
        throw error}
        const cart = await myCache.get(req.userId)
    if(!cart){
        const error=new Error('the user has no cart')
        error.statusCode=404
        throw error}
        const order=await user.createOrder({
            totalPrice:cart.totalPrice
        })
        const orderBooks=cart.books.map(async(book)=>{
            const orderedBook=await order.addBook(book.bookId,{through:{qty:book.quantity}})
            return orderedBook
        })
        cart.books.forEach(book=>{
            Book.update({count:sequelize.literal('count-'+book.quantity)},{where:{_id:book.bookId}})
        })
        res.status(200).json({message:'the order has been created',order:order,books:orderBooks})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}