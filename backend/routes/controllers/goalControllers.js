const aynchHandler = require('express-async-handler')
// get goals
//route GET /apio/goals
//access private

const getGoal = aynchHandler(async(req,res) =>{
    res.json({message:'Get goals'})
}
)


// set goals
//route GET /apio/goals
//access private

const setGoal = aynchHandler(async (req,res)=>{
    console.log(req.body);
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text fild')
    }


    res.status(200).json({msg: 'Set Goals'})
}

)

// get goals
//route GET /apio/goals
//access private

const updateGoal = aynchHandler(async (req,res)=>{
    res.json({mes: `update goal ${req.params.id}`})
}
)


// get goals
//route GET /apio/goals
//access private

const deleteGoal =  aynchHandler(async(req,res)=>{
    res.json({mes: `delete goal ${req.params.id}`})

}

)
module.exports = {
    getGoal,setGoal,deleteGoal,updateGoal
}