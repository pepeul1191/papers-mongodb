import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: String,
  url: String,
});

const File = mongoose.model('File', fileSchema, 'files');

export default File;