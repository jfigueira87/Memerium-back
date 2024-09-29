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

export const getMeme = (req, res) => {
  res.send("Get one meme");
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
