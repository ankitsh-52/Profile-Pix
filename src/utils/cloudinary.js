import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
// import { response } from "express";
import fs from "fs";    //It is available in node & used to manage files 

configDotenv();
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath)  return null;

        //uploading file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })  //TODO read about uploader.upload

        //file uploaded successfully
        console.log("File uploaded successfully", response.url);
        fs.unlinkSync(localFilePath)    //Removes file after successful uploading.
        //TODO console.log(response);
        
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)    // remove the locally saved temp file as the upload operation get failed.
        console.error('Error uploading to Cloudinary', error);
        return null;
    }
}


export { uploadOnCloudinary };