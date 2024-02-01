const { Sequelize } = require("sequelize");

const sequelize=require('../util/sequelize')

const Order=sequelize.define('orders',{
_id:{
    autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
},
totalPrice:{
    type:Sequelize.INTEGER,
    allowNull:false,
}

})

module.exports=Order