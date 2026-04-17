import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Register User: /api/user/register
export const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body

        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"Missing details"})
        }

        const existUser=await User.findOne({email})
        if(existUser){
            return res.json({success:false,message:"User Already Exits"})
        }

        const hashedPassword=await bcrypt.hash(password,10)
        const user= await User.create({name,email,password: hashedPassword})

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true, //prevent js to access cookie
            secure:process.env.NODE_ENV==="production", //use secure cookies in prosuction
            sameSite:'lax',//CSRF cookie
            maxAge:7*24*60*60*1000
        })

        return res.json({
        success: true,
        user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        cartItems: user.cartItems
    }
    })

    }
    catch(err){
        console.log(err.message)
        res.json({success:false,message:err.message})
    }
}

//login user:/api/user/login
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body

        if(!email || !password){
            return res.status(400).json({success:false,message:"email and password required"})
        }

        const user=await User.findOne({email})
        if(!user){
            return res.json({success:false,message:"User Doesn't Exits"})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({success:false, message:"Invalid Password or Email"})
        }

        const token=jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true, //prevent js to access cookie
            secure:process.env.NODE_ENV==="production", //use secure cookies in prosuction
            sameSite:'lax',//CSRF cookie
            maxAge:7*24*60*60*1000
        })

        return res.json({
        success: true,
        user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        cartItems: user.cartItems
        }
    })
    }
    catch(err){
        console.log(err.message)
        res.json({success:false,message:err.message})
    }
}

//check auth: /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select("-password");
        return res.json({ success: true, user });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

//logout user: /api/user/logout
export const logout=async (req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'lax'
        })
        return res.json({success:true,message:"logged out"})
    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }
}
