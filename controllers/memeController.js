import Meme from "../models/memeModel.js";
import { validationResult } from "express-validator";

export const getMemes = async (req, res) => {
  try {
    const memes = await Meme.find();
    res.json(memes);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getMeme = async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);

    if (!meme) {
      return res.status(404).json("Meme no encontrado");
    }

    res.json(meme);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const createMeme = async (req, res) => {
  // Manejar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, category, tags, url } = req.body;

    const newMeme = new Meme({ name, category, tags, url });
    const savedMeme = await newMeme.save();

    res.status(201).json(savedMeme);
  } catch (error) {
    console.error("Error al crear el meme:", error);
    res.status(500).json({
      message: "Hubo un error al crear el meme",
      error: error.message,
    });
  }
};

export const updateMeme = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, tags, url } = req.body;
    const updatedMeme = await Meme.findByIdAndUpdate(
      id,
      { name, category, tags, url },
      { new: true }
    );

    if (!updatedMeme) {
      return res.status(404).json({ message: "Meme no encontrado." });
    }

    res.status(200).json(updatedMeme);
  } catch (error) {
    console.error("Error actualizando meme:", error);
    res
      .status(500)
      .json({ message: "Error actualizando meme", error: error.message });
  }
};

// DELETE meme
export const deleteMeme = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Intentando eliminar el meme con ID: ${id}`);

    const meme = await Meme.findById(id);
    if (!meme) {
      console.log("Meme no encontrado para eliminar");
      return res.status(404).json({ message: "No se encuentra el meme" });
    }

    await meme.deleteOne();
    console.log(`Meme con ID ${id} eliminado con éxito`);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar el meme:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
