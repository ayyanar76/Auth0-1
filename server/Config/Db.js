import mongoose from "mongoose";

export const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("DB CONNECTED");
            
        })
    } catch (error) {
         console.log(error.message);
         process.exit(1)
         
    }
}