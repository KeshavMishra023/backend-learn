import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary = async (localpath) => {
    try {
        if(!localpath) return null;
         const response = await cloudinary.uploader.upload
        (localpath, {
                resource_type: "auto"
            })

        // file uploaded successfully 
        console.log("file uploaded successfully", response.url);
        return response;
    } catch (error) {
        fs.unlink(localpath)
        // remove the local filed saved temporaray 
    }
}

export {uploadOnCloudinary};