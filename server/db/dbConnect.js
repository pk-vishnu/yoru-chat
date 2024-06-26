import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
};
export default dbConnect;
