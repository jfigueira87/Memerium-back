import { Sequelize } from "sequelize";
import { DB_KEY, DB_NAME, DB_USER } from "../config.js";

const conection_db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_KEY, {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

export default conection_db;
