import express from "express";
import {
  getTeachers,
  createTeacher,
  deleteTeacher,
} from "../controller/teacherController";
import { imageUpload } from "../middleware/mediaUpload";
const router = express.Router();

router.get("/teachers", getTeachers);
router.post("/teacher/new", imageUpload.single("photo"), createTeacher);
router.delete("/teacher/:id", deleteTeacher);

export default router;
