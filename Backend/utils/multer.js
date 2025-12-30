const multer = require('multer');
const cloudinary = require('./cloudinary');
const { CloudinaryStorage} = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: async () => ({
        folder: 'campus-well',
        allowedFormats: ['jpg','png','jpeg'],
        transformation: [{ quality: "auto", fetch_format: "auto" }],
    }),

})

const upload = multer({ storage });
module.exports = upload;