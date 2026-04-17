import jwt from 'jsonwebtoken'

const authSeller=(req,res,next)=>{
    const {sellerToken}=req.cookies;

    if(!sellerToken){
        return res.json({success:false,message:"Not AuthoriZed"})
    }

    try{
        const tokenDecoded=jwt.verify(sellerToken,process.env.JWT_SECRET)
        if(tokenDecoded.email===process.env.SELLER_EMAIL){
            next()
        }
        else{
            return res.status(403).json({success:false,message:'Not Authorized'})
        }
    }
    catch(error){
       return res.status(401).json({ success: false, message: "Not Authorized" });
    }
}

export default authSeller