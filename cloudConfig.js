// cloudConfig.js
// Placeholder for future Cloudinary integration




const cloudinary  = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',  // Optional: Folder for uploaded files in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],  // Optional: Restrict allowed file types
  },
});

 module.exports = {
    cloudinary,
    storage,
};

    // transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional: Apply image transformations on upload
