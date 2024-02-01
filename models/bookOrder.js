const { Sequelize } = require("sequelize");

const  sequelize = require('../util/sequelize.js')

const BookOrder = sequelize.define('books_orders', {
    qty:Sequelize.INTEGER
})

module.exports=BookOrder