import conection_db from "./database/db.js";
import memeModel from "./models/memeModel.js";
import express from "express";
import router from "./routes/routes.js";
import cors from 'cors';
import { PORT } from "./config.js";
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(cors());
app.listen(PORT, () =>
  console.log("Working server up 👍 http://localhost:8000/meme")
)


const startServer = async () => {
  try {
    
    await conection_db.authenticate();
    console.log('✅Te has conectado a la BD✅');
    
    await memeModel.sync({ force: false });
    console.log('El modelo está 👍🏻 ');
    
    app.listen(PORT, () => {
      console.log(`El servidor se ha levantado en el puerto 🖥️ ${PORT}`);
    });

  } catch (error) {
    console.error('❌ La conexión a la base de datos ha fallado:', error);
  }
};

startServer();