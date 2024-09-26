import memeModel from "../models/memeModel.js";

export const getMemes = async (req, res) => {
  try {
    const memes = await memeModel.findAll();
    res.status(200).json(memes);
  } catch (error) {
    console.error("Error encontrando memes:", error);
    res
      .status(500)
      .json({ error: "Ha ocurrido un error mientras se encontraba memes." });
  }
};

export const getMeme = async (req, res) => {
  try {
    const { id } = req.params;
    const meme = await memeModel.findOne({ where: { id } });

    if (meme) {
      res.status(200).json(meme);
    } else {
      res.status(404).json({ error: "Meme no encontrado." });
    }
  } catch (error) {
    console.error("Error encontrando meme:", error);
    res
      .status(500)
      .json({ error: "Ha ocurrido un error mientras se encontraba un meme." });
  }
};

export const createMeme = async (req, res) => {
  try {
    const { title, category, tags, url } = req.body;
    const lastMeme = await memeModel.findOne({ order: [["id", "DESC"]] });
    const newId = lastMeme ? lastMeme.id + 1 : 1;

    const newMeme = await memeModel.create({
      id: newId,
      title,
      category,
      tags,
      url,
    });
    res.json(newMeme);
  } catch (error) {
    console.error("Error creating meme:", error);
    res
      .status(500)
      .json({ error: "Error creating meme", details: error.message });
  }
};

export const updateMeme = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, tags, url } = req.body;
    const [updated] = await memeModel.update(
      { title, category, tags, url },
      { where: { id } }
    );

    if (updated) {
      const updatedMeme = await memeModel.findOne({ where: { id } });
      res.status(200).json(updatedMeme);
    } else {
      res.status(404).json({ message: "Meme not found" });
    }
  } catch (error) {
    console.error("Error updating meme:", error);
    res
      .status(500)
      .json({ error: "Error updating meme", details: error.message });
  }
};

export const deleteMeme = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await memeModel.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: "Meme successfully deleted." });
    } else {
      res.status(404).json({ message: "Meme not found." });
    }
  } catch (error) {
    console.error("Error deleting meme:", error);
    res
      .status(500)
      .json({ error: "Error deleting meme", details: error.message });
  }
};
