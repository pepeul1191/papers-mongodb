import fs from 'fs';
import express from 'express';
import multer from 'multer';
import constants from '../../config/constants.js';
import KeyWord from '../models/key_word.js';
import { ObjectId } from 'mongodb';
import { dbConnection } from '../../config/database.js';

const router = express.Router();

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
    req.generatedFileUrl = 'uploads/' + _id + '/' + uniqueSuffix + '-' + file.originalname;
    cb(null, uniqueSuffix + '-' + file.originalname); // Ensure a unique filename
  }
});
const upload = multer({ storage: storage });

router.get('/fetch-all', async (req, res, next) => {
  try {
    const { db, client } = await dbConnection();
    const papersCollection = db.collection('papers');
    const result = await papersCollection.aggregate([
      {
        $lookup: {
          from: "key_words",
          localField: "key_words",
          foreignField: "_id",
          as: "key_words_data"
        }
      },
      {
        $project: {
          _id: { $toString: "$_id" },
          authors: 1,
          author_abstract: 1,
          my_abstract: 1,
          name: 1,
          year: 1,
          source: 1,
          source_url: 1,
          my_ranking: 1,
          key_words: 1,
          doi: 1,
          file_url: 1,
          created: { $dateToString: { format: "%d/%m/%Y %H:%M:%S", date: "$created", timezone: "-05:00" } },
          updated: { $dateToString: { format: "%d/%m/%Y %H:%M:%S", date: "$updated", timezone: "-05:00" } },
          key_words: {
            $map: {
              input: "$key_words_data",
              as: "kw",
              in: {
                _id: { $toString: "$$kw._id" },
                name: "$$kw.name",
              }
            }
          }
        }
      }
    ]).toArray();
    // save paper
    client.close();
    // Retorna el ID de la palabra clave insertada o encontrada
    res.status(200).send(result);
  } catch (error) {
    console.error('Error al manejar la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

router.get('/fetch-by-topic', async (req, res, next) => {
  const topicId = req.query.topic_id;
  try {
    const { db, client } = await dbConnection();
    const topics = db.collection('topics');
    const result = await topics.aggregate([
      {
        $match: { _id: new ObjectId(topicId) }
      },
      {
        $lookup: {
          from: "search_strings",
          localField: "search_strings",
          foreignField: "_id",
          as: "search_strings"
        }
      },
      {
        $unwind: "$search_strings"
      },
      {
        $replaceRoot: { newRoot: "$search_strings" }
      },
      {
        $project: {
          _id: { $toString: "$_id" },
          source: 1,
          name: 1,
          url: 1,
          description: 1,
          file_url: 1,
        }
      }
    ]).toArray();
    // save paper
    client.close();
    // Retorna el ID de la palabra clave insertada o encontrada
    res.status(200).send(result);
  } catch (error) {
    console.error('Error al manejar la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

router.get('/fetch-one', async(req, res, next) => {
  const paperId = req.query._id;
  console.log(paperId)
  try {
    const { db, client } = await dbConnection();
    const search_strings = db.collection('search_strings');
    const result = await search_strings.aggregate([
      {
        $match: { _id: new ObjectId(paperId) }
      },
      {
        $project: {
          _id: { $toString: "$_id" },
          name: 1,
          url: 1,
          source: 1,
          name: 1,
          description: 1,
          file_url: 1,
          created: { $dateToString: { format: "%d/%m/%Y %H:%M:%S", date: "$created", timezone: "-05:00" } },
          updated: { $dateToString: { format: "%d/%m/%Y %H:%M:%S", date: "$updated", timezone: "-05:00" } },
        }
      }
    ]).toArray();
    // save paper
    client.close();
    //console.log(result)
    // Retorna el ID de la palabra clave insertada o encontradazs
    res.status(200).send(result[0]);
  } catch (error) {
    console.error('Error al manejar la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

router.post('/delete', async (req, res, next) => {
  try {
    const { _id } = req.body;
    const { db, client } = await dbConnection();
    // create or update document
    const search_strings = db.collection('search_strings');
    const result = await search_strings.deleteOne({ _id: new ObjectId(_id) });
    client.close();
    // Comprueba si se eliminó un documento correctamente
    if (result.deletedCount === 1) {
      // Retorna el éxito al cliente
      res.status(200).send(_id);
    } else {
      // Retorna un mensaje si el documento no se encontró
      res.status(404).json({ message: 'Documento no encontrado' });
    }
  } catch (error) {
    console.error('Error al manejar la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

router.post('/save', upload.single('file'), async (req, res, next) => {
  try {
    const { _id, name, source, url, file, file_url, topic_id, description } = req.body;
    //  console.log(req.body);
    const generatedFileUrl = file == null ? req.generatedFileUrl : file_url;
    //console.log(generatedFileUrl);
    const { db, client } = await dbConnection();
    // create or update document
    const search_strings = db.collection('search_strings');
    let doc = await search_strings.findOne({ _id: new ObjectId(_id) });
    const now = new Date();
    if (doc != null) {
      await search_strings.updateOne(
        { _id: new ObjectId(_id) }, // Filtro para encontrar el documento por _id
        {
          $set: {
            name: name,
            description: description,
            url: url,
            source: source,
            file_url: generatedFileUrl,
            updated: now,
          }
        });
    }else{
      const document = await search_strings.insertOne({
        _id: new ObjectId(_id),
        name: name,
        description: description,
        url: url,
        source: source,
        file_url: generatedFileUrl,
        created: now,
        updated: now,
      });
      // update topics with the new paper id
      if(topic_id != null){
        const topics = db.collection('topics');
        await topics.updateOne(
          { _id: new ObjectId(topic_id) },
          { $push: { 
              search_strings: document.insertedId 
            },
            $set: { 
              updated: now 
            }
          },
        );
      }
    }
    // save paper
    client.close();
    // Retorna el ID de la palabra clave insertada o encontrada
    res.status(200).send(generatedFileUrl);
  } catch (error) {
    console.error('Error al manejar la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
