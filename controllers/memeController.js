import memeModel from "../models/memeModel.js";

export const getMemes = async (req, res) => {
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
      return res.status(404).json({ message: "Meme not found" }); // Código 404: No encontrado
    }

    return res.json(memes); // Esto ya envía el estado 200 por defecto
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createMeme = (req, res) => {
  res.send("Create meme");
};

export const updateMeme = (req, res) => {
  res.send("Update meme");
};

export const deleteMeme = (req, res) => {
  res.send("Delete meme");
};
