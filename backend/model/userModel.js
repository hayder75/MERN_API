const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true , 'please add a text value']
    } ,
    email: {
        type: String,
        required:[true , 'please add a email value'],
        unique: true
    } ,
    password: {
        type: String,
        required:[true , 'please add a password value']
    } ,
} , {
    timestamps: true,
})

module.exports = mongoose.model('User',userSchema)