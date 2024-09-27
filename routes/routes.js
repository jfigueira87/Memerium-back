import { Router } from "express";
import { getMeme, getMemes, createMeme, updateMeme, deleteMeme } from '../controllers/memeController.js';
import { memeValidationRules } from '../validators/memeValidator.js';

const router = Router();

//GET all memes
router.get("/meme", getMemes);

//GET one meme by ID
router.get("/meme/:id", getMeme);

//CREATE meme
router.post('/meme', memeValidationRules, createMeme);

//PUT meme by ID
router.put("/meme/:id", updateMeme);

//DELETE meme
router.delete("/meme/:id", deleteMeme);

export default router;
