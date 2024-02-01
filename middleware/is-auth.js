const jwt=require('jsonwebtoken')

module.exports= (req,res,next)=>{
    const token=req.headers.authorization
    if(!token){
        const error=new Error('the user is not authorized')
        error.statusCode=400
        throw error
    }
    let decodedToken
    try{
     decodedToken=jwt.verify(token,'secretkeyofthejsontoken')
    }catch(err){
        err.statusCode=500
        throw err
    }
    req.userId=decodedToken.userId
    next()
}