import mongoose from 'mongoose';

mongoose.connection.on('connected',()=>console.log("Database connected"));
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI,{ dbName: "myfresh" })
    }
    catch(error){
        console.error("error:",error.message);
    }
}

export default connectDB;