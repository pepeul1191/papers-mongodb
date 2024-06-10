import fs from 'fs';
import express from 'express';
import multer from 'multer';
import constants from '../../config/constants.js';
import KeyWord from '../models/key_word.js';
import { ObjectId } from 'mongodb';
import { dbConnection } from '../../config/database.js';

const router = express.Router();
const view_routes = ['', '/add'];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { _id } = req.body;
    const folderPath = 'public/uploads/' + _id;
    // Verificar si la carpeta existe
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Error al crear la carpeta:', err);
        cb(err, null);
      } else {
        console.log('Carpeta creada exitosamente o ya existe:', folderPath);
        cb(null, folderPath); // Set the destination to public/uploads
      }
    });
  },
  filename: function (req, file, cb) {
    const { _id } = req.body;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    req.generatedFileUrl = 'public/uploads/' + _id + '/' + uniqueSuffix + '-' + file.originalname;
    cb(null, uniqueSuffix + '-' + file.originalname); // Ensure a unique filename
  }
});
const upload = multer({ storage: storage });

router.get(view_routes, (req, res, next) => {
  // response
  const locals = {
    constants: constants,
    title: 'Bienvenido',
    session: req.session,
    contents: {},
  };
  res.status(200).render('papers', locals);
});

router.post('/save', upload.single('file'), async (req, res, next) => {
  try {
    const { _id, authors, name, author_abstract, my_abstract, year, source, source_url, my_ranking, key_words, doi, file } = req.body;
    const generatedFileUrl = req.generatedFileUrl;
    const { db, client } = await dbConnection();
    // generate key words array of object ids
    let keyWordsIdsArray = [];
    const keyWords = key_words.split(',');
    const keyWordsCollection = db.collection('key_words');
    for (const keyWord of keyWords) {
      let doc = await keyWordsCollection.findOne({ name: keyWord });
      if (doc === null) {
        doc = await keyWordsCollection.insertOne({ name: keyWord });
      }
      keyWordsIdsArray.push(doc._id);
    }
    // create or update document
    const paperCollection = db.collection('papers');
    let doc = await paperCollection.findOne({ _id: new ObjectId(_id) });
    const now = new Date();
    if (doc != null) {
      await paperCollection.updateOne(
        { _id: new ObjectId(_id) }, // Filtro para encontrar el documento por _id
        {
          $set: {
            authors: authors,
            author_abstract: author_abstract,
            my_abstract: my_abstract,
            year: year,
            source: source,
            source_url: source_url,
            my_ranking: my_ranking,
            key_words: keyWordsIdsArray,
            doi: doi,
            file_url: generatedFileUrl,
            updated: now 
          }
        });
    }else{
      await paperCollection.insertOne({
        _id: new ObjectId(_id),
        authors: authors,
        author_abstract: author_abstract,
        my_abstract: my_abstract,
        year: year,
        source: source,
        source_url: source_url, 
        my_ranking: my_ranking,
        key_words: keyWordsIdsArray,
        doi: doi,
        file_url: generatedFileUrl,
        created: now,
        updated: now 
      });
    }
    // save paper
    client.close();
    // Retorna el ID de la palabra clave insertada o encontrada
    res.status(200).send('XD');
  } catch (error) {
    console.error('Error al manejar la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
