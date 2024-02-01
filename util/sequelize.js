const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('library', 'root', 'maya@123', {
    host:'localhost',
    dialect:'mysql'
})


module.exports=sequelize

