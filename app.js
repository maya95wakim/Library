//libraries
const express = require('express')
const app = express()
const bodyParser=require('body-parser')
const { Sequelize } = require('sequelize')

//files
const sql = require('./util/sequelize')
const queryInterface = sql.getQueryInterface()

//models
const Book  = require('./models/book.js')
const  Author  = require('./models/author.js')
const  Order  = require('./models/order.js')
const  User  = require('./models/user.js')
const  bookOrder  = require('./models/bookOrder.js')


//routes
const libraryRoute=require('./routes/library.js')
const authRoute=require('./routes/auth.js')
const cartRoute=require('./routes/cart.js')
const orderRoute=require('./routes/order.js')
const searchRoute=require('./routes/search.js')
const userRoute=require('./routes/user.js')


app.use(bodyParser.json())
app.use(libraryRoute)
app.use(authRoute)
app.use(cartRoute)
app.use(orderRoute)
app.use(searchRoute)
app.use(userRoute)
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.statusCode).json({message:err.message,status:err.statusCode})
  })

Book.belongsToMany(Author,{through:'books_authors'})
Author.belongsToMany(Book,{through:'books_authors'})
Order.belongsTo(User)
Order.belongsToMany(Book,{through:bookOrder})
Book.belongsToMany(Order,{through:bookOrder})
User.hasMany(Order)


sql.sync({force:true}).then(() => {
    app.listen('3000')
})