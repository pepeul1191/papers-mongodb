import mongoose from 'mongoose';

const paperSchema = new mongoose.Schema({
  _id: String, // Cambia el tipo de dato según corresponda
  authors: String,
  name: String,
  author_abstract: String,
  my_abstract: String,
  year: Number,
  source: String,
  source_url: String,
  my_ranking: Number,
  key_words: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KeyWord'
  }], // Lista de ObjectIds
  doi: String,
  file: String, // Cambia el tipo de dato si estás almacenando una ruta de archivo
});

const Paper = mongoose.model('Paper', paperSchema);

export default Paper;