const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User=require('../../model/userModel')
// register new user
const registerUser =asyncHandler( async (req,res)=>{
    const {name , email , password} = req.body
    
    if(!name || !email || !password){
    res.status(400)
    throw new Error('please add all fields')

    }

    //check if a user exists
    const userExist = await User.findOne({email})

    if(userExist){
    res.status(400)
    throw new Error('user already exists')   
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create the user 
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('user not created')   
        
    }
}
)




// Auth a user
const loginUser = asyncHandler( async(req,res)=>{
    const {email , password} = req.body

    //check user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password , user.password))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token:generateToken(user._id),

        })
    }else{
        res.status(400)
        throw new Error('wrong user ')   
        
    }
    }

)



// Get my data
//@access Private
const getMe = asyncHandler( async (req,res)=>{
    const {_id,name,email}=await User.findById(req.user.id)

    res.status(200).json({
        _id: _id,
        name,
        email,

    })

}

)
//Generate jwt

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET , {
        expiresIn: '30d',
    })
}
module.exports={
    registerUser,loginUser,getMe
} 