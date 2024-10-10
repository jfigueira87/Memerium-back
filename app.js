import conection_db from "./database/db.js";
import memeModel from "./models/memeModel.js";
import express from "express";
import router from "./routes/routes.js";
import cors from 'cors';
import { PORT } from "./config.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

// Función para iniciar la base de datos y el servidor
export const startServer = async () => {
  try {
    await conection_db.authenticate();
    console.log('✅ Te has conectado a la BD ✅');
    
    await memeModel.sync({ force: false });
    console.log('El modelo está 👍🏻');
    
    // Solo iniciar el servidor si no está en modo de test
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`El servidor se ha levantado en el puerto 🖥️ ${PORT}`);
      });
    }
  } catch (error) {
    console.error('❌ La conexión a la base de datos ha fallado:', error);
  }
};

// Llamar a la función para iniciar el servidor
startServer();
//module.exports = { app, server };