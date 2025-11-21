import mongoose from "mongoose"
import mongoose from 'mongoose'

const mongo = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("database is connected succesfully");
        
    } catch (error) {
        console.log("error while connecting to database", error);
    }
};

export default mongo;