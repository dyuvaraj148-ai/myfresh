import jwt from 'jsonwebtoken'


//login seller:/api/seller/login
export const sellerlogin=async(req,res)=>{
    try{
        const {email,password}=req.body

        if(email===process.env.SELLER_EMAIL && password===process.env.SELLER_PASSWORD){
            const token=jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7d'})

            res.cookie('sellerToken',token,{
                httpOnly:true,
                secure:true,
                sameSite:'none',
                maxAge:7*24*60*60*1000
            })
            return res.json({success:true,message:"Logged In"})
        }
        else{
            return res.json({success:false,message:"Invalid Credentials"})
        }   
    }
    catch(err){
        console.log(err.message)
        return res.json({success:false,message:err.message})
    }
}

//check seller auth: /api/seller/is-auth
export const sellerAuth = async (req, res) => {
    try {
        const token = req.cookies.sellerToken;
        if (!token) {
            return res.json({ success: false, message: "Not authenticated" });
        }
        jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: "Invalid token" });
    }
};

//logout seller: /api/seller/logout
export const sellerlogout=async (req,res)=>{
    try{
        res.clearCookie('sellerToken',{
            httpOnly:true,
            secure:true,
            sameSite:'none'
        })
        return res.json({success:true,message:"logged out"})
    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }
}
