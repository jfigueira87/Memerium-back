import { Router } from "express";
import { getMeme, getMemes, createMeme, updateMeme, deleteMeme } from "../controllers/memeController.js";

const router = Router();

//GET all memes
router.get("/", getMemes);

//GET one meme by ID
router.get("/:id", getMeme);

//CREATE meme
router.post("/", createMeme);

//PUT meme by ID
router.put("/:id", updateMeme);

//DELETE meme
router.delete("/:id", deleteMeme);

export default router;
