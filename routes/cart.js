const express=require('express')
const route=express.Router()
const cartController=require('../controllers/cart.js')
const isAuth=require('../middleware/is-auth.js')

route.get('/cart',isAuth,cartController.getCart)
route.post('/addtocart/:bookId',isAuth,cartController.addToCart)
route.delete('/deletecartitem/:bookId',isAuth,cartController.deleteCartItem)

module.exports=route