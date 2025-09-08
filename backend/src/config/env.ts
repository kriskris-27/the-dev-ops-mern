import dotenv from "dotenv";
dotenv.config();

const { PORT, MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set in environment variables");
}

export const config = {
  PORT: Number(PORT) || 5001,
  MONGODB_URI,
};
