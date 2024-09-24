import conection_db from "./database/db.js";
import memeModel from "./models/memeModel.js";

try {
    await conection_db.authenticate();
    console.log('La conexión ha sido exitosa');

    await memeModel.sync({ force: true });
    console.log('Se ha creado correctamente');

  } catch (error) {
    console.error('La conexión ha fallado', error);
  }