const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const userdb = require('../models/userdb')


// Get all db data
router.get('/', async(req,res) =>{
    try{
        const users = await userdb.find()
        res.json(users)
    }catch(err){
        res.json({message: err})
    }
})


// signup with encrypted password and hash
router.post('/', async (req,res) => {
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password , salt)
        const user = new userdb({
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
        college: req.body.college
        })
        const savedUser = await user.save()
        res.json(savedUser)
    }catch(err){
        res.json({message:err})
    }
})

//get and check for username existence in db
router.get('/:userName' , async (req,res) => {
    try{
        const user = await userdb.findOne({username: req.params.userName})
        res.json(user)
        }catch(err){
            res.json({message:err})
        }
})

// delete user account from db
router.delete('/:userName' , async(req,res)=>{
    try{
        const removeduser = await userdb.deleteOne({username: req.params.userName})
        res.json(removeduser)
    }catch(err){
        res.json({message: err})
    }    
})


// edit or modify the username's college
router.patch('/:userName' , async(req,res)=>{
    try{
        const updateUser = await userdb.updateOne({username: req.params.userName}, {$set: {college: req.body.college}})
        res.json(updateUser)
    }catch(err){
        res.json({message: err})
    }    
})




module.exports = router