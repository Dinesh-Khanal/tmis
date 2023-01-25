import express from "express";
import { getTeachers } from "../controller/teacherController";
const router = express.Router();

router.get("/teachers", getTeachers);

export default router;
