const asyncHandler = require('express-async-handler')
const Goal = require('../../model/goalModel')


// get goals
//route GET /apio/goals
//access private

const getGoal = asyncHandler(async(req,res) =>{
    const goals = await Goal.find()
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
        text: req.body.text
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

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id , req.body , {
        new: true,
    })
    res.json(updateGoal)
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
  
    await goal.remove() 

    
    res.json(req.params.id)
}

)
module.exports = {
    getGoal,setGoal,deleteGoal,updateGoal
}