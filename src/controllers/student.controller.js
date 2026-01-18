import Student from "../model/studentModel.js"
import { uploadOnCloudinary } from "../service/cloudnary.js";
import fs from "fs";

export const createStudent = async (req, res) => {
  try {
    const { name, registrationNo, branch, batch } = req.body;

    // basic validation
    if (!name || !registrationNo || !branch || !batch) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // multer file
    const localFilePath = req.file?.path;
    if (!localFilePath) {
      return res.status(400).json({ message: "Image is required" });
    }

    // upload to cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    // create student
    const student = await Student.create({
      name,
      registrationNo,
      branch,
      batch,
      imageUrl: cloudinaryResponse.secure_url,
    });

    return res.status(201).json({
      success: true,
      student,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
