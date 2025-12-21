require ('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGODBURL = process.env.MONGODBURL;

const PORT = process.env.PORT;


module.exports = {
    JWT_SECRET,
    MONGODBURL,
    PORT,
};
