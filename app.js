import connectDB from "./database/db.js";
import express from "express";
import router from "./routes/routes.js";
import cors from 'cors';
import { PORT } from "./config.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/memes', router);

const startServer = async () => {
  try {
    await connectDB();
    console.log('✅Te has conectado a la BD✅');
    
    console.log('El modelo está 👍🏻 ');
    
    app.listen(PORT, () => {
      console.log(`El servidor se ha levantado en el puerto 🖥️ ${PORT}`);
    });

  } catch (error) {
    console.error('❌ La conexión a la base de datos ha fallado:', error);
  }
};

startServer();
