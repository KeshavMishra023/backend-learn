import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"

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

        fs.unlinkSync(localpath);
        return response;
    } catch (error) {
        await fs.unlink(localpath);
        // remove the local filed saved temporaray 
        
        console.log("Cloudinary upload error:", error);
    }
}

export {uploadOnCloudinary};