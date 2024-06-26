const jwt=require('jsonwebtoken')
const asyncHandler= require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async (req,res,next) =>{
let token 

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
        // get token from bearer 
        token=req.headers.authorization.split(' ')[1]

        //verify the token 
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        //get user from the token
        req.user = await User.findById(decoded.id).select('-password')

        next()
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('not authorized ')
    }
}

if(!token){
    res.status(401)
    throw new Error('no token found ')
}
})

module.exports={protect}