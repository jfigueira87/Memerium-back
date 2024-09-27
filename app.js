import conection_db from "./database/db.js";
import memeModel from "./models/memeModel.js";
import express from "express";
import router from "./routes/routes.js";
import { PORT } from "./config.js";

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Usar las rutas de memes
app.use('/api', router);

// Verificar la conexión a la base de datos
try {
  await conection_db.authenticate();
  console.log('La conexión ha sido exitosa');

  // Sincronizar modelo con base de datos
  await memeModel.sync({ force: false }); // Usar `force: false` para evitar borrar datos

  console.log('Se ha creado correctamente');
} catch (error) {
  console.error('La conexión ha fallado', error);
}

// Escuchar peticiones en el puerto
app.listen(PORT, () => {
  console.log("Working server up 👍 http://localhost:8000/meme");
});
