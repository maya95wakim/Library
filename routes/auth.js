const authController=require('../controllers/auth.js')
const express=require('express')
const route=express.Router()

route.post('/signup',authController.signUp)
route.get('/login',authController.logIn)

module.exports=route