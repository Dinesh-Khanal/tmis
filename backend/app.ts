import express from "express";
import cors from "cors";
import path from "path";
import ErrorHandler from "./middleware/errorHandler";
import teacher from "./routes/teacherRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../frontend/dist/")));
app.use("/images/", express.static(path.join(__dirname, "../upload/images/")));

app.use("/api", teacher);
app.use(ErrorHandler);

export default app;
