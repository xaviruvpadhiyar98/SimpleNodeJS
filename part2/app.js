const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/signup')
require('dotenv/config')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const signupRoute = require('./routes/signup')
app.use('/signup', signupRoute)

const loginRoute = require('./routes/login')
app.use('/login', loginRoute)


app.get('/',(req,res)=>{
    console.log('We are home')
})

mongoose.connect(process.env.DB_CONNECTION , { useUnifiedTopology: true,  useNewUrlParser: true ,useCreateIndex: true },() =>{console.log('Connected')})

app.listen(5000,() => {
    console.log("Listening")
})