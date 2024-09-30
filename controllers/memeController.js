import memeModel from "../models/memeModel.js";

export const getMemes = async (req, res)=>{
    try{
    const memes = await memeModel.findAll ();
    res.json(memes);
    }
    catch (error){
        res.send({message: error.message})
    }
}

export const getMeme = async (req, res) => {
  try {
    const memes = await memeModel.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!memes) {
      return res.status(404).json("Meme not found");
    }

    return res.json(memes); // Esto ya envía el estado 200 por defecto
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const createMeme = (req, res) => {
  res.send("Create meme");
};

export const updateMeme = (req, res) => {
  res.send("Update meme");
};

export const deleteMeme = (req, res) => {
  res.send("Delete meme");
};
