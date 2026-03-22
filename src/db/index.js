import mongoose  from "mongoose";
import { DB_NAME } from "../constants.js";

const dbConnection = async () => {
    try {
         const dbInsatnce = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
         console.log(`/n MongoDB connected !! DB Host : ${dbInsatnce.connection.host}`);
    } catch (error) {
        console.log("URI:", process.env.MONGODB_URI)
        console.log("Mongo DB Connection Erorr:", error);
        process.exit(1)

    }
}

export default dbConnection;