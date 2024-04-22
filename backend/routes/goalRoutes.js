const express = require('express')
const router = express.Router()

const {getGoal,setGoal,deleteGoal,updateGoal}= require('../routes/controllers/goalControllers')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getGoal).post(protect,setGoal)

router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

module.exports = router;