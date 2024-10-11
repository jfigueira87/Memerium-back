import dotenv from 'dotenv'
dotenv.config();

export const DB_KEY = process.env.KEY_DB
export const DB_NAME = process.env.DB_NAME
export const DB_USER = process.env.DB_USER
export const PORT = 8000;