import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
// fs -- file system we can read , write, remove files with the help of this


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "EcommereceStore",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const upload_media_to_cloud = async (localFilePath) => {
    let operation_response = {
        STATUS: 'ERROR',
        MESSAGE: '',
        ERROR_FILTER: 'TECHNICAL_ISSUE',
        ERROR_DESCRIPTION: 'Failed to upload file to cloud'
    };
    try {

        if (!localFilePath) {
            console.log("File : cloudinary_service.js | upload_media_to_cloud | Failed to upload file media", localFilePath)
            return operation_response
        }

        const media = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })

        console.log("URL of the uploaded media : ", media.url)

        operation_response.STATUS = "Successfull";
        operation_response.MESSAGE = "file uploaded succesfully";
        operation_response.DB_DATA = media

        return operation_response;
    } catch (error) {
        console.log("FILE : Product_service:35 | create_product | error while creating product", error.stack)

        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        operation_response.STATUS = "ERROR";
        operation_response.ERROR_DESCRIPTION = error.message || "Error while uploading the media";
        return operation_response;
    }
}

export {upload_media_to_cloud};