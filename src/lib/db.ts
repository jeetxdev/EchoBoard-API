import mongoose from "mongoose";
const mongoUrl = process.env.DB_URL!;

if (!mongoUrl) {
  throw new Error("DB URL not set");
}

export default async function connectDB() {
  return mongoose.connect(mongoUrl);
}
