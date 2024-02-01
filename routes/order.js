const express=require('express')
const route=express.Router()
const orderContrller=require('../controllers/order.js')
const isAuth=require('../middleware/is-auth.js')

route.get('/orders',isAuth,orderContrller.getOrders)
route.post('/createorder',isAuth,orderContrller.placeOrder)

module.exports=route