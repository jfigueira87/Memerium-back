import memeModel from "../models/memeModel.js";



export const getMemes = (req, res) => {
  res.send("Get all memes");
};

export const getMeme = (req, res) => {
  res.send("Get one meme");
};

export const createMeme = (req, res) => {
  res.send("Create meme");
};

export const updateMeme = (req, res) => {
  res.send("Update meme");
};

export const deleteMeme = async (req, res) => {
  try{
    const result = await memeModel.destroy({
      where:{
        id: req.params.id,
      }
    });

    if (result===0){
      return res.status(404).json({message: 'No se encuentra el meme'});
    }

    return res.sendStatus(204);
  }catch (error) {
    console.error('Error al eliminar el meme:',error);
    return res.status(500).json({message: 'error interno del servidor'});
  }
  
};
