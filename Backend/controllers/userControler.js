import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
// route for user login
const loginUser = async(req,res)=>{
    try {

        const {email,password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User Does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }

        else{
            return res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:"some error happened"})  
    }
}

// router for user regster
const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body

        // checking user already exist
        const exits = await userModel.findOne({email})
        if(exits){
            return res.json(({success:false,message:"User already exits"}))
        }

        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json(({success:false,message:"Please enter  a valid email"}))  
        }
        
        // validating the password
        if(password.length<8){
            return res.json(({success:false,message:"Please enter  a strong password"}))  
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPaaword = await bcrypt.hash(password,salt)
        const newUser = new userModel({
            name,
            email,
            password:hashedPaaword
        })

        const user=await newUser.save()

        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Some error happend"})
    }
}

// route for admin login
const adminLogin = async(req,res)=>{
    try {
        const {email,password}=req.body
        if(email===process.env.admin_email  && password===process.env.admin_password){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        
        else{
            res.json({success:false,message:"Invlaid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Some error happend"})    
    }
}
export {loginUser,registerUser,adminLogin}