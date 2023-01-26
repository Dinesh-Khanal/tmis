import { Schema, model } from "mongoose";
import validator from "validator";
import { ITeacher } from "../types/teacherType";

const teacherSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [40, "Name should be not more than 40 characters"],
    minLength: [4, "Name should be atleast 4 characters"],
  },
  address: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  fatherName: String,
  subject: String,
  dob: Date,
  photoUrl: String,
});
export default model<ITeacher>("Teacher", teacherSchema);
