import { Router } from "express";
import { getMeme, getMemes, createMeme, updateMeme, deleteMeme } from "../controllers/memeController.js";
import { memeValidationRules, validateCreateOrUpdate, validateIdParam, handleValidationErrors} from "../validators/memeValidators.js";
import { validationResult } from 'express-validator';

const router = Router();

// Middleware para manejar los errores de validación

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


// GET all memes
router.get("/meme", getMemes);

// GET one meme by ID
router.get("/meme/:id", validateIdParam, handleValidationErrors, getMeme);

// CREATE meme - Usa la validación de creación (POST)
router.post("/meme", memeValidationRules, handleValidationErrors, createMeme);


// PUT meme by ID - Usa la validación de actualización (PUT)
router.put("/meme/:id", [...validateIdParam, ...validateCreateOrUpdate], handleValidationErrors, updateMeme);

// DELETE meme by ID
router.delete("/meme/:id", validateIdParam, handleValidationErrors, deleteMeme);

export default router;
