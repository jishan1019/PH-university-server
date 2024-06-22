import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

export const sendImgToCloudinary = async (imageName: string, path: string) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch((error) => {});

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url(imageName, {
    fetch_format: 'auto',
    quality: 'auto',
  });

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url(imageName, {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
  });

  if (uploadResult) {
    // Delete the temporary file
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  return uploadResult;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/src/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
