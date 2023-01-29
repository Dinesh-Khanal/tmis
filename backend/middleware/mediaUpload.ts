import express from "express";
import multer from "multer";
import path from "path";

// Image Upload
const imageStorage = multer.diskStorage({
  destination: "./upload/images", // Destination to store image
  filename: (req, file, cb) => {
    cb(
      null, //here first argument is error or null
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image), path.extname get the uploaded file extension
  },
});

export const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|JPG)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(null, true);
  },
});
// ---------------------------------------------------------------------------- //

// Video Upload
const videoStorage = multer.diskStorage({
  destination: "./upload/videos", // Destination to store video
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 10000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|MPEG-4)$/)) {
      // upload only mp4 and mkv format
      return cb(new Error("Please upload a Video"));
    }
    cb(null, true);
  },
});
