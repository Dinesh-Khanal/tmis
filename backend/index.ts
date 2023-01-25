import app from "./app";
import dbConnect from "./config/database";
import dotenv from "dotenv";

process.on("uncaughtException", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log("Server is shutting down due to uncaught exception");
  process.exit(1);
});
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./backend/config/config.env" });
}
dbConnect();
const PORT = Number(process.env.PORT) || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log("Server is shutting down due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
