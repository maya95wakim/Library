const User=require('../models/user.js')

exports.deleteUser=(req,res,next)=>{
    User.destroy({where:{_id:req.userId}})
    res.status(200).json({message:'the user has been deleted successfully'})
}