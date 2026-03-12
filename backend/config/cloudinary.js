const cloudinary            = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer                = require('multer');

// Cloudinary v1 config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Images "reuseit/devices" folder mein jayengi Cloudinary par
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder:          'reuseit/devices',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation:  [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
  },
});

// Max 5 images, har ek max 5MB
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Sirf image files allowed hain!'), false);
    }
  },
});

// v1 mein delete ke liye cloudinary.v2 use hota hai
module.exports = { cloudinary: cloudinary.v2, upload };