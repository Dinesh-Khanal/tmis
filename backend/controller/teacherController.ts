import { Response, Request } from "express";
import Teacher from "../model/teacherModel";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError";

export const getTeachers = asyncHandler(async (req: Request, res: Response) => {
  const teachers = await Teacher.find();
  if (teachers) {
    res.status(200).json(teachers);
  } else {
    throw new AppError("Could not found teacher data", 500);
  }
});
export const createTeacher = asyncHandler(
  async (req: Request, res: Response) => {
    const photo = req.file?.filename;
    const { name, address, fatherName, email, subject, dob } = req.body;
    const teacher = await Teacher.create({
      name,
      address,
      fatherName,
      email,
      subject,
      dob,
      photo,
    });
    if (teacher) {
      res.status(200).json(teacher);
    } else {
      throw new AppError(
        "Something went wrong, teacher record could not save",
        500
      );
    }
  }
);
