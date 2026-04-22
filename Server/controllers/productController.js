import Product from "../models/product.js"
import { v2 as cloudinary } from "cloudinary"

//Add product : /api/product/add
export const addProduct=async(req,res)=>{
    try{
        let productData=JSON.parse(req.body.productData)
        const images=req.files || []
        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result= await cloudinary.uploader.upload(
                    item.path,
                    {resource_type:'image'})
                 return result.secure_url
            })
        )
        await Product.create({...productData,image:imagesUrl})
        return res.json({success:true,message:"Product Added"})
    }
    catch(error){
        console.log(error.message);
        return res.json({success:false,message:error.message})
    }

}

//Get product : /api/product/list
export const productList=async(req,res)=>{
    try{
        const products=await Product.find({inStock:true})
        return  res.json({success:true,products})
    }
    catch(error){
        console.log(error.message);
        return res.json({success:false,message:error.message})
    }
}

//Get single product : /api/product/productid
export const productById = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);
        return res.json({ success: true, product });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

//change stock 
export const changeStock = async (req, res) => {
    try {
        const { productId, inStock } = req.body;
        await Product.findByIdAndUpdate(productId, { inStock });
        return res.json({ success: true, message: "Stock changed" });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};