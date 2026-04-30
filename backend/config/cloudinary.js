const cloudinary            = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer                = require('multer');

// Cloudinary v1 configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Images will be stored in the "reuseit/devices" folder on Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder:          'reuseit/devices',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation:  [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
  },
});

// Maximum 5 images allowed, each up to 5MB
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// In v1, cloudinary.v2 is used for delete operations
module.exports = { cloudinary: cloudinary.v2, upload };