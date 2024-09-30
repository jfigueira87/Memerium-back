import memeModel from "../models/memeModel.js";

export const getMemes = (req, res) => {
  res.send("Get all memes");
};

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

export const createMeme = (req, res) => {
  res.send("Create meme");
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
