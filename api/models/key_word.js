import mongoose from 'mongoose';

const keyWordSchema = new mongoose.Schema({
  name: {type: String, index: true }
});

const KeyWord = mongoose.model('KeyWord', keyWordSchema, 'key_words');

export default KeyWord;