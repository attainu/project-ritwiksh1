import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateTokens.js'
import User from "../models/userModel.js";


// Signin User authentication
const authUser = asyncHandler(async (req,res)=>{

const {email,password} = req.body

// res.send({email,password}) 

const user = await User.findOne({email})

// console.log("user>>>>>>")

if(user && (await user.matchPassword(password))){

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    })


}
else{

    res.status(401)
    throw new Error('Invalid email or password')
}

})




//SignUp User


const registerUser = asyncHandler(async (req,res)=>{

    const {name,email,password} = req.body
    
    // res.send({email,password}) 

    const userExists = await User.findOne({email})
    

    if(userExists){


        res.status(400)
        throw new Error('Email already exists. Use a different email')
    }
    
    const user = await User.create({
        name,email,password
    })

    if(user){

        res.status(201).json({
            _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)

        })
    }

    else {
        res.status
        throw new Error('ERROR!!! Invalid Data ')
    }


    
    
    })
    
    




//User profile
const  getUserProfile= asyncHandler(async (req,res)=>{

    
    
    
    
    const user = await User.findById(req.user._id)

    // console.log("User>>>>>",req.user._id)

    if(user){


        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin})
    



    }else{

        res.status(404)
        throw new Error('ERROR!!! User Not Found.')

    }
    
    // res.send("Success")
    
    })








//Update profile
const  UpdateUserProfile= asyncHandler(async (req,res)=>{

    
    
    
    
    const user = await User.findById(req.user._id)

    // console.log("User>>>>>",req.user._id)

    if(user){

user.name = req.body.name || user.name
user.email = req.body.email || user.email

if(req.body.password){
    user.password =req.body.password

}

const updatedUser = await user.save()

res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser._id)})


    }else{

        res.status(404)
        throw new Error('ERROR!!! User Not Found.')

    }
    
    // res.send("Success")
    
    })
    

 
export {authUser,getUserProfile,registerUser,UpdateUserProfile}