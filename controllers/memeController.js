import Meme from '../models/memeModel.js'; // Importa el modelo correctamente
import { validationResult } from 'express-validator';

export const getMemes = (req, res) => {
  res.send("Get all memes");
};

export const getMeme = (req, res) => {
  res.send("Get one meme");
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

export const deleteMeme = (req, res) => {
  res.send("Delete meme");
};
