const userController=require('../controllers/user.js')
const express=require('express')
const route=express.Router()


route.post('/deleteuser',userController.deleteUser)

module.exports=route