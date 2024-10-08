// Import ES modules
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.config.js';

// Configure Multer with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    allowedFormats: ['jpeg', 'png', 'jpg'],
    public_id: (req, file) => `profile_${Date.now()}`,  // Custom file name
  },
});

// Multer middleware for uploading files
const upload = multer({ storage });

export default upload;
