import fs from 'fs';
import express from 'express';
import multer from 'multer';
import constants from '../../config/constants.js';
import KeyWord from '../models/key_word.js';
import { ObjectId } from 'mongodb';
import { dbConnection } from '../../config/database.js';
import { zipFolder } from '../helpers/topic_helper.js';

const router = express.Router();

router.get('/fetch-all', async (req, res, next) => {
  try {
    const { db, client } = await dbConnection();
    const tags = db.collection('tags');
    const result = await tags.aggregate([
      {
        $project: {
          _id: { $toString: "$_id" },
          name: 1,
          papers: { 
            $cond: {
              if: { $isArray: "$papers" }, // Verifica si "papers" es un array
              then: { $size: "$papers" },  // Si es un array, calcula su tamaño
              else: 0                      // Si no es un array (null o vacío), devuelve 0
            }
           },
          created: { $dateToString: { format: "%d/%m/%Y %H:%M:%S", date: "$created", timezone: "-05:00" } },
          updated: { $dateToString: { format: "%d/%m/%Y %H:%M:%S", date: "$updated", timezone: "-05:00" } },
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

router.post('/delete', async (req, res, next) => {
  try {
    const { _id } = req.body;
    const { db, client } = await dbConnection();
    // create or update document
    const tags = db.collection('tags');
    const result = await tags.deleteOne({ _id: new ObjectId(_id) });
    // Comprueba si se eliminó un documento correctamente
    client.close();
    if (result.deletedCount === 1) {
      // Retorna el éxito al cliente
      res.status(200).json({ message: 'Documento eliminado exitosamente' });
    } else {
      // Retorna un mensaje si el documento no se encontró
      res.status(404).json({ message: 'Documento no encontrado' });
    }
  } catch (error) {
    console.error('Error al manejar la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

router.post('/save', async (req, res, next) => {
  try {
    const { _id, name, topic_id } = req.body;
    const { db, client } = await dbConnection();
    // db
    const now = new Date();
    const tags = db.collection('tags');
    const document = await tags.insertOne({
      name: name,
    });
    // save tag
    const data = {
      _id: document.insertedId.toString(),
      name: name,
      articles: 0,
    }
    // add tag to topic
    if(topic_id != null){
      const topics = db.collection('topics');
      await topics.updateOne(
        { _id: new ObjectId(topic_id) },
        { $push: { 
            tags: document.insertedId 
          },
          $set: { 
            updated: now 
          }
        },
      );
    }
    client.close();
    // Retorna el ID de la palabra clave insertada o encontrada
    res.status(200).send(JSON.stringify(data));
  } catch (error) {
    console.error('Error al manejar la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
