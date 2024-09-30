import { Router } from "express";
import { getMeme, getMemes, createMeme, updateMeme, deleteMeme } from "../controllers/memeController.js";
import { validateMemeId, handleValidation } from '../validators/memeValidators.js'; // Importas las validaciones

const router = Router();

//GET all memes
router.get("/meme", getMemes);

//GET one meme by ID
router.get("/meme/:id", validateMemeId, handleValidation,  getMeme);

//CREATE meme
router.post('/meme', memeValidationRules, createMeme);

//PUT meme by ID
router.put("/meme/:id", updateMeme);

//DELETE meme
router.delete("/meme/:id", deleteMeme);

export default router;
