import Address from "../models/address.js";


//Add Address : /api/address/add
export const addAddress=async(req,res)=>{
    try{
        const { address } = req.body
        const userId = req.user?.userId

        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authorized" })
        }

        await Address.create({ ...address, userId })
        return res.json({success:true,message:"Address Added Successfully"})
    }
    catch(error){
        console.log(error.message);
        return res.json({success:false,message:error.message})
    }
}

//Get Address : /api/address/get
export const getAddress=async(req,res)=>{
    try{
        const userId = req.user.userId
        const addresses=await Address.find({userId})
        return res.json({success:true,addresses})
    }
    catch(error){
        console.log(error.message);
        return res.json({success:false,message:error.message})
    }
}
