const { Sequelize } = require("sequelize");

const  sequelize = require('../util/sequelize.js')

const Book = sequelize.define('books', {
    _id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:1
    },
    isbn: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pages: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: Sequelize.INTEGER
})

module.exports=Book