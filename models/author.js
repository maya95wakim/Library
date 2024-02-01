const { Sequelize } = require("sequelize");

const sequelize = require('../util/sequelize')

const Author = sequelize.define('authors', {
    _id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bio: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports=Author