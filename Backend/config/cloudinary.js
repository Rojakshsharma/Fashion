import {v2 as cloudinary} from "cloudinary"
import 'dotenv/config'
const connectCloudinary = async () =>{
    cloudinary.config({
        cloud_name:process.env.cloud_name,
        api_key : process.env.cloudinary_api,
        api_secret:process.env.cloudinary_secret_key 
    })
}
export default connectCloudinary

