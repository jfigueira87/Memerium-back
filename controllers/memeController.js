import memeModel from '../models/memeModel.js'; // Importa el modelo correctamente
import { validationResult } from 'express-validator';

export const getMemes = async (req, res)=>{
  try{
  const memes = await memeModel.findAll ();
  res.json(memes);
  }
  catch (error){
      res.send({message: error.message})
  }
}

export const getMeme = async (req, res) => {
  try {
    const memes = await memeModel.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!memes) {
      return res.status(404).json("Meme not found");
    }

    return res.json(memes); // Esto ya envía el estado 200 por defecto
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const createMeme = async (req, res) => {
  // Manejar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, category, tags, url } = req.body;

    const newMeme = await Meme.create({
      title,
      category,
      tags,
      url,
    });

    res.status(201).json(newMeme);
  } catch (error) {
    console.error('Error al crear el meme:', error);
    res.status(500).json({ message: 'Hubo un error al crear el meme', error: error.message });
  }
};

export const updateMeme = (req, res) => {
  res.send("Update meme");
};

// DELETE meme
export const deleteMeme = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Intentando eliminar el meme con ID: ${id}`);

    // Verificamos si el meme existe antes de eliminarlo
    const meme = await memeModel.findOne({ where: { id } });
    if (!meme) {
      console.log('Meme no encontrado para eliminar');
      return res.status(404).json({ message: 'No se encuentra el meme' });
    }

    await meme.destroy();
    console.log(`Meme con ID ${id} eliminado con éxito`);
    return res.sendStatus(204);
  } catch (error) {
    console.error('Error al eliminar el meme:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
