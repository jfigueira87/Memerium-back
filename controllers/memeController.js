import memeModel from "../models/memeModel.js";
import { validationResult } from "express-validator";

//=============
// GET ALL meme
//=============
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

//=============
// GET ONE meme
//=============
export const getMeme = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const memes = await memeModel.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!memes) {
      return res.status(404).json("Meme no encontrado");
    }

    return res.json(memes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//=============
// CREATE meme
//=============
export const createMeme = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, category, tags, url } = req.body;
    const lastMeme = await memeModel.findOne({ order: [["id", "DESC"]] });
    const newId = lastMeme ? lastMeme.id + 1 : 1;

    const newMeme = await memeModel.create({
      id: newId,
      name,
      category,
      tags,
      url,
    });

    res.status(201).json(newMeme);
  } catch (error) {
    console.error("Error al crear el meme:", error);
    res.status(500).json({
      message: "Hubo un error al crear el meme",
      error: error.message,
    });
  }
};

//=============
// UPDATE meme
//=============
export const updateMeme = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, category, tags, url } = req.body;
    const [updated] = await memeModel.update(
      { name, category, tags, url },
      { where: { id } }
    );

    if (updated) {
      const updatedMeme = await memeModel.findOne({ where: { id } });
      res.status(200).json(updatedMeme);
    } else {
      res.status(404).json({ message: "Meme no encontrado." });
    }
  } catch (error) {
    console.error("Error actualizando meme:", error);
    res
      .status(500)
      .json({ error: "Error actualizando meme", details: error.message });
  }
};
//=============
// DELETE meme
//=============
export const deleteMeme = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    console.log(`Intentando eliminar el meme con ID: ${id}`);

    const meme = await memeModel.findOne({ where: { id } });
    if (!meme) {
      console.log("Meme no encontrado para eliminar");
      return res.status(404).json({ message: "No se encuentra el meme" });
    }

    await meme.destroy();

    return res.status(200).json({ message: `Meme con ID ${id} eliminado con éxito` });
  } catch (error) {
    console.error("Error al eliminar el meme:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
