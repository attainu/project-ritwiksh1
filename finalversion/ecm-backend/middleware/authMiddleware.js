import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


const protect =asyncHandler(async(req,res,next)=>{

let token 

// console.log(req.headers.authorization)

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

    // console.log("token found")
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded= jwt.verify(token,process.env.JWT_SECRET)

                     req.user =  await (User.findById(decoded.id).select('-password'))

                    //  console.log(" req.user>>>>>>>",req.user)


            // console.log("Decoded>>>>>>",decoded)
            next();
        } catch (error) {

            console.error("error>>>",error)
            res.status(401)
            throw new Error ('Token fail Error. UnAuthorised')
            
        }
}
if(!token){

    res.status(401)
    throw new Error('No token. Unauthorized Access')
}
//2 cb's
// next()
})


const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error ('Access Denied. Need Admin level privileges.')
    }
}


export  {protect,admin}