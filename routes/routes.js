import { Router } from "express";
import { getMeme, getMemes, createMeme, updateMeme, deleteMeme } from "../controllers/memeController.js";
import { validateCreate, validateGetOne } from "../validators/memes.js"

const router = Router();

//GET all memes
router.get("/", getMemes);

//GET one meme by ID
router.get("/:id", validateGetOne, getMeme);

//CREATE meme
router.post("/", validateCreate, createMeme);

//PUT meme by ID
router.put("/:id", validateCreate, updateMeme);

//DELETE meme
router.delete("/:id", deleteMeme);

export default router;
