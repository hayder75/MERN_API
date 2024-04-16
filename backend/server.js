const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000;

const app = express();

// middleware code in order to adddata from json and urlencde
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/goals',require('./routes/goalRoutes'));

app.listen(PORT,()=> console.log('server started '));