require ('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGODBURL = process.env.MONGODBURL;
const PORT = process.env.PORT;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;


module.exports = {
    JWT_SECRET,
    MONGODBURL,
    PORT,
    CLOUDINARY_URL,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
};
