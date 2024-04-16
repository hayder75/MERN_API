const express = require('express')
const router = express.Router()

const {getGoal,setGoal,deleteGoal,updateGoal}= require('../routes/controllers/goalControllers')

router.route('/').get(getGoal).post(setGoal)

router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports = router;