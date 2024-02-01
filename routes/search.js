const express=require('express')
const route=express.Router()
const searchContrller=require('../controllers/search.js')
const isAuth=require('../middleware/is-auth.js')

route.get('/search',searchContrller.searchForBook)

module.exports=route