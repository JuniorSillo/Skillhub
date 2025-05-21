import mongoose from "mongoose";

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/lms`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
