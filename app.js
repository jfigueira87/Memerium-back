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

<<<<<<< HEAD
// Middleware para interpretar JSON
app.use(express.json());

app.listen(PORT, () => {
  console.log("Working server up 👍 http://localhost:8000/meme");
});
// Usar las rutas de memes
app.use('/api', router);

// Función para iniciar el servidor
async function startServer() {
  try {
    // Verificar la conexión a la base de datos
=======

const startServer = async () => {
  try {
    
>>>>>>> ecfed8595a3b4d83af1cd7b912ca8ce1fafdf71f
    await conection_db.authenticate();
    console.log('✅Te has conectado a la BD✅');
    
    await memeModel.sync({ force: false });
    console.log('El modelo está 👍🏻 ');
    
    app.listen(PORT, () => {
      console.log(`El servidor se ha levantado en el puerto 🖥️ ${PORT}`);
    });

    // Escuchar peticiones en el puerto
    app.listen(PORT, () => {
      console.log("Working server up 👍 http://localhost:8000/meme");
    });
  } catch (error) {
<<<<<<< HEAD
    console.error('La conexión ha fallado', error);
  }
}

// Iniciar el servidor directamente
startServer();

export default app;
=======
    console.error('❌ La conexión a la base de datos ha fallado:', error);
  }
};

startServer();
>>>>>>> ecfed8595a3b4d83af1cd7b912ca8ce1fafdf71f
