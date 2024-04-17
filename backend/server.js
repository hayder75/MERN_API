const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

const connectDB = require('./consig/db')
const PORT = process.env.PORT || 5000;

connectDB()

const app = express();

// middleware code in order to adddata from json and urlencde
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/goals',require('./routes/goalRoutes'));
app.use('/api/users',require('./routes/userRoutes'));

app.use(errorHandler)

app.listen(PORT,()=> console.log('server started '));