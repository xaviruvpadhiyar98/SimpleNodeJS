const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const userdb = require('../models/userdb')


router.get('/', (req,res) =>{
    res.json({message: "You are at login"})
})


router.post('/' , async (req,res) => {
    try{
        const user = await userdb.findOne({username: req.body.username})
        if(user){
            const isPasswordTrue = bcrypt.compareSync(req.body.password, user["password"])
            if(isPasswordTrue){
               res.json({message:"Success"})
           }
           else {
            res.json({message:"Username/password wrong"})
           }
        }
        else{
            res.json({message:"Username/password wrong"})
        }

        }catch(err){
            res.json({message:err})
        }
})

module.exports = router