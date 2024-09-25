import {Router} from 'express'

const router = Router()

//GET all memes
router.get('/meme')

//GET one meme by ID
router.get('/meme/:id')

//CREATE meme
router.post('/meme')

//PUT meme by ID
router.put('/meme/:id')

//DELETE meme
router.delete('/meme/:id')

export default router