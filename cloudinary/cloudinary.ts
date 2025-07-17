import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    api_key:process.env.CLOUDE_API_KEY,
    api_secret:process.env.CLOUDE_API_SECRET,
    cloud_name:process.env.CLOUDE_NAME
})
export default cloudinary