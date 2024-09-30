import conection_db from "./database/db.js";
import memeModel from "./models/memeModel.js";
import express from "express";
import router from "./routes/routes.js";
import cors from 'cors';
import { PORT } from "./config.js";

const app = express();
app.use(router);
app.use(cors());

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
    await conection_db.authenticate();
    console.log('La conexión ha sido exitosa');

    await memeModel.sync({ force: false });
    console.log('Se ha creado correctamente');

    // Escuchar peticiones en el puerto
    app.listen(PORT, () => {
      console.log("Working server up 👍 http://localhost:8000/meme");
    });
  } catch (error) {
    console.error('La conexión ha fallado', error);
  }
}

// Iniciar el servidor directamente
startServer();

export default app;
