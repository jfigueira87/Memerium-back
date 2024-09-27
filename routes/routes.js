import { Router } from "express";
import { getMeme, getMemes, createMeme, updateMeme, deleteMeme } from "../controllers/memeController.js";
const { memeValidationRules } = require('../validators/memeValidators'); // Importar las validaciones
const router = Router();

//GET all memes
router.get("/meme", getMemes);

//GET one meme by ID
router.get("/meme/:id", getMeme);

//CREATE meme
router.post('/meme', createMeme, memeValidationRules);

//PUT meme by ID
router.put("/meme/:id", updateMeme);

//DELETE meme
router.delete("/meme/:id", deleteMeme);

export default router;
