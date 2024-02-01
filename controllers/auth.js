const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

exports.signUp = async (req, res, next) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const status = req.body.status
    const password = req.body.password
    try {
        const user = await User.findOne({ where: { email: email } })
        if (user) {
            const error = new Error('the user is already exist')
            error.statusCode = 400
            throw error
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            status: status,
            password: hashedPassword
        })
        await newUser.save()
        return res.status(200).json({ message: 'the user has been created', user: newUser })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}
exports.logIn = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            const error = new Error('there is no such a user')
            error.statusCode = 401
            throw error
        }
        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            const error = new Error('the password is not correct')
            error.statusCode = 401
            throw error
        }
        const token=jwt.sign({email:user.email,userId:user._id},'secretkeyofthejsontoken',{expiresIn:'30d'})
        return res.status(200).json({ message: 'logged in successfully', user: user,token:token})
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}