import mongoose from 'mongoose';

const memeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const Meme = mongoose.model('Meme', memeSchema);

export default Meme;
