import conection_db from "./database/db.js";
import memeModel from "./models/memeModel.js";
import express from "express"
import router from "./routes/routes.js";
import cors from 'cors';
import { PORT } from "./config.js";
import cors from "cors";


const app = express();
app.use(router);
app.use(cors());
app.listen(PORT, () =>
  console.log("Working server up 👍 http://localhost:8000/meme")
)


try {
    await conection_db.authenticate();
    console.log('La conexión ha sido exitosa');

    await memeModel.sync({ force: false });
    console.log('Se ha creado correctamente');

  } catch (error) {
    console.error('La conexión ha fallado', error);
  }