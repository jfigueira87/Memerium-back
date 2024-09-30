import { Router } from "express";
import { getMeme, getMemes, createMeme, updateMeme, deleteMeme } from "../controllers/memeController.js";
import { validateCreateOrUpdate, validateIdParam } from "../validators/memeValidators.js";
import {handleValidationErrors} from "../utils/handleValidator.js"


const router = Router();

// GET all memes
router.get("/meme", getMemes);

// GET one meme by ID
router.get("/meme/:id", validateIdParam, handleValidationErrors, getMeme);

// CREATE meme
router.post("/meme", validateCreateOrUpdate, handleValidationErrors, createMeme);

// PUT meme by ID
router.put("/meme/:id", validateIdParam, validateCreateOrUpdate, handleValidationErrors, updateMeme);

// DELETE meme by ID
router.delete("/meme/:id", validateIdParam, handleValidationErrors, deleteMeme);

export default router;