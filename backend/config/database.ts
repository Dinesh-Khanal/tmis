import mongoose from "mongoose";

const dbConnect = () => {
  mongoose.connect(process.env.DB_URI as string).then((data) => {
    console.log(`MongoDb is connected to the host ${data.connection.host}`);
  });
};
export default dbConnect;
