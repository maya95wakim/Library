const express=require('express')
const route=express.Router()
const isAuth=require('../middleware/is-auth.js')

const libraryController=require('../controllers/library.js')

route.get('/books/:page',isAuth,libraryController.getBooks)
route.post('/addbook',isAuth,libraryController.addBook)
route.delete('/deletebook/:bookId',isAuth,libraryController.deleteBook)
route.post('/updatebook/:bookId',isAuth,libraryController.updateBook)

module.exports=route