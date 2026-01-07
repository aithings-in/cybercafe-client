import mongoose from "mongoose";
require("dotenv").config();
const connectDB = async (): Promise<void> => {
  try {
    const mongoURI =
      process.env.MONGODB_URI ||
      "mongodb+srv://ashishmathura1234_db_user:Gv188VyPZOtHANhF@cluster0.vnsjzou.mongodb.net/?appName=Cluster0";
    console.log(mongoURI, process.env.MONGODB_URI);

    if (!mongoURI) {
      console.error("MONGODB_URI is not defined in environment variables.");
      process.exit(1);
    }

    await mongoose.connect(mongoURI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
