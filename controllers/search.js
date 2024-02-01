const { Sequelize } = require('sequelize')
const Author=require('../models/author.js')
const Book=require('../models/book.js')
const Op=Sequelize.Op

exports.searchForBook=async(req,res,next)=>{
    const keyWord=req.body.keyWord
    let result
    try{
     result=await Book.findAll({
        where:{
        [Op.or]:{
            title:{[Op.like]:  `%${keyWord}%`},
            isbn:keyWord,
            description:{[Op.like]:`%${keyWord}%`}
        }
    }
        })
        if(!result || !result.length){
            console.log('testiodhghoaihdgoi')
            result=await Author.findAll({
                where:{
                [Op.or]:{
                    first_name:{[Op.like]:`%${keyWord}%`},
                    last_name:{[Op.like]:`%${keyWord}%`}
                }
                },include:Book})
                if(!result || !result.length){
                    const err=new Error('there is no such a book')
                    err.statusCode=404
                    throw err
                }
        }
        res.status(200).json({message:'this is the book',result:result})
    }catch(error){
        if(!error.status){
            error.statusCode=500
        }
        next(error)
    }
}