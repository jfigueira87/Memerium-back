import memeModel from "../models/memeModel.js";

// GET all memes
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

// GET one meme by ID
export const getMeme = async (req, res) => {
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
};

// CREATE meme
export const createMeme = async (req, res) => {
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
};

// UPDATE meme
export const updateMeme = async (req, res) => {
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
