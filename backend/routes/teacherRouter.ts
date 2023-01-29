import express from "express";
import {
  getTeachers,
  createTeacher,
  deleteTeacher,
  updateTeacher,
} from "../controller/teacherController";
import { imageUpload } from "../middleware/mediaUpload";
const router = express.Router();

router.get("/teachers", getTeachers);
router.post("/teacher/new", imageUpload.single("photo"), createTeacher);
router.put("/teacher/:id", imageUpload.single("photo"), updateTeacher);
router.delete("/teacher/:id", deleteTeacher);

export default router;
