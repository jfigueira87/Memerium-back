import memeModel from "../models/memeModel.js";
import { validationResult, param, body } from 'express-validator';

//GET all meme
export const getMemes = async (req, res) => {
  try {
    const result = await memeModel.findAll();

    if (result.length === 0) {
      // Respuesta 200 si no hay memes, pero la solicitud fue exitosa
      return res.status(200).json({ message: 'No hay memes disponibles' });
    }
    // Respuesta 200 con los memes obtenidos
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al obtener los memes:', error);   
    res.status(500).json({ message: 'No se han podido obtener los memes' });
  }
};

//GET one meme by ID
export const getMeme = [  
  param('id').isInt().withMessage('El ID debe ser un número entero'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const meme = await memeModel.findOne({ where: { id } });

      if (!meme) {
        return res.status(404).json({ message: 'Meme no encontrado' });
      }

      res.status(200).json(meme);
    } catch (error) {
      console.error('Error al obtener el meme:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
];

//CREATE meme
export const createMeme = [
  
  body('title').notEmpty().withMessage('El título es obligatorio').isString().withMessage('El título debe ser un texto'),
  body('category').notEmpty().withMessage('La categoría es obligatoria').isString().withMessage('La categoría debe ser un texto'),
  body('tags').notEmpty().withMessage('Los tags son obligatorios').isString().withMessage('Los tags deben ser un texto'),
  body('url').notEmpty().withMessage('La URL es obligatoria').isURL().withMessage('Debe proporcionar una URL válida'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, category, tags, url } = req.body;

      const newMeme = await memeModel.create({
        title,
        category,
        tags,
        url,
      });

      res.status(201).json(newMeme);
    } catch (error) {
      console.error('Error al crear el meme:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
];

//UPDATE meme
export const updateMeme = [
 
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  body('title').optional().isString().withMessage('El título debe ser un texto'),
  body('category').optional().isString().withMessage('La categoría debe ser un texto'),
  body('tags').optional().isString().withMessage('Los tags deben ser un texto'),
  body('url').optional().isURL().withMessage('Debe proporcionar una URL válida'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params; 
      const { title, category, tags, url } = req.body;

      const meme = await memeModel.findOne({ where: { id } });

      if (!meme) {
        return res.status(404).json({ message: 'Meme no encontrado' });
      }
      
      await meme.update({
        title: title ?? meme.title,
        category: category ?? meme.category,
        tags: tags ?? meme.tags,
        url: url ?? meme.url,
      });

      res.status(200).json(meme);
    } catch (error) {
      console.error('Error al actualizar el meme:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
];

//DELETE meme
export const deleteMeme = async (req, res) => {
  try{
    const result = await memeModel.destroy({
      where:{
        id: req.params.id,
      }
    });
    if (result===0){
      return res.status(404).json({message: 'No se encuentra el meme'});
    }
    return res.sendStatus(204);
  }catch (error) {
    console.error('Error al eliminar el meme:',error);
    return res.status(500).json({message: 'error interno del servidor'});
  }  
};
