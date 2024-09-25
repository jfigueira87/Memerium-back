import dotenv from "dotenv";
dotenv.config();

export const PORT = 3000;
export const DB_KEY = process.env.DB_KEY;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
