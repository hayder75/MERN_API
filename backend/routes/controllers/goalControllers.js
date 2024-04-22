const asyncHandler = require('express-async-handler')
const Goal = require('../../model/goalModel')
const { protect } = require('../../middleware/authMiddleware')
const User = require('../../model/userModel')



// get goals
//route GET /apio/goals
//access private

const getGoal = asyncHandler(async(req,res) =>{
    const goals = await Goal.find({user:req.user.id})
    res.json(goals)
}
)


// set goals
//route GET /apio/goals
//access private

const setGoal = asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text fild')
    }

    const goals = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goals)
}

)

// get goals
//route GET /apio/goals
//access private



const updateGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
  
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('user not found')
    }

    // logged in user and goal id match ?

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User is not auth')
    }


    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id , req.body , {
        new: true,
    })
    res.json(updatedGoal)
}
)


// get goals
//route GET /apio/goals
//access private

const deleteGoal =  asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('user not found')
    }

    // logged in user and goal id match ?

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User is not auth')
    }
    
  
    await goal.remove() 

    
    res.json(req.params.id)
}

)
module.exports = {
    getGoal,setGoal,deleteGoal,updateGoal
}