import { response } from "express";
import Address from "../models/address.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import User from "../models/User.js";
import stripe from 'stripe';

// place Order COD :/api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { address, items } = req.body;
        const userId = req.user.userId;
        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid Data" });
        }

        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            amount += product.offerPrice * item.quantity;
        }

        amount += Math.floor(amount * 0.02); // 2% logic fix
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        });

        // Clear the cart after placing order
        await User.findByIdAndUpdate(userId, { cartItems: [] });

        return res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

// place Order stripe : /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const {address, items} = req.body;
        const {origin}=req.headers;
        const userId = req.user.userId;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid Data" });
        }

        let amount = 0;
        let productData = [];
        for (const item of items) {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            });
            amount += product.offerPrice * item.quantity;
        }

        amount += Math.round(amount * 0.02); // 2% logic fix
        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "online"
        });

        // Clear the cart after placing order
        await User.findByIdAndUpdate(userId, { cartItems: [] });

        //stripe gateway
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //creating line items for stripe
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.round((item.price + item.price * 0.02) * 100)
                },
                quantity: item.quantity
            };
        });

        const totalAmount = line_items.reduce((sum, lineItem) => sum + lineItem.price_data.unit_amount * lineItem.quantity, 0);
        if (totalAmount < 5000) {
            return res.json({
                success: false,
                message: "Stripe requires a minimum online order total of roughly ₹50 (about $0.50). Please add more items or choose Cash on Delivery."
            });
        }

        //create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId: userId,
            }
        });

        return res.json({ success: true,url:session.url });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

//stripe webhook to verify payment Action:/stripe
export const stripewebhooks=async (request,response)=>{
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

    const sig=request.headers["stripe-signature"]
    let event;

    try{
        event=stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    }
    catch(error){
        response.status(400).send(`Webhook Error: ${error.message}`)
    }

    //handle event
    switch(event.type){
        case "payment_intent.succeeded":{
            const paymentIntent=event.data.object
            const paymentIntentId=paymentIntent.id 

            //getting Session Metadata
            const session=await stripeInstance.checkout.session.list({
                payment_intent:paymentIntentId
            })

            const {orderId,userId}=session.data[0].metadata

            //mark payment as paid
            await Order.findByIdAndUpdate(orderId,{isPaid:true})
            //clear user Cart
            await User.findByIdAndUpdate(userId,{cartItems:[]})
            break;
        }
        case "payment_intent.payment_failed":{
            const paymentIntent=event.data.object
            const paymentIntentId=paymentIntent.id 

            //getting Session Metadata
            const session=await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })

            const {orderId}=session.data[0].metadata

            await Order.findByIdAndUpdate(orderId,{paymentStatus:"failed"})
            break;
        }
        default:
            console.error(`Unhandled event type:${event.type}`)
            break;
    }
    response.json({received:true})
}

//get Orders by User Id : /api/order/user
export const getUserOrder=async(req,res)=>{
    try{
        const userId = req.user.userId
        const orders=await Order.find({
            userId,
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1})
        res.json({success:true,orders})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}

//get All orders (for seller/admin: /api/order/seller)
export const getAllOrder=async(req,res)=>{
    try{
        const orders=await Order.find({
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1})
        res.json({success:true,orders})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}