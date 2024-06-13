import fs from 'fs';
import express from 'express';
import multer from 'multer';
import constants from '../../config/constants.js';
import KeyWord from '../models/key_word.js';
import { ObjectId } from 'mongodb';
import { dbConnection } from '../../config/database.js';

const router = express.Router();

router.get('/fetch-all', async (req, res, next) => {
  try {
    const { db, client } = await dbConnection();
    const topics = db.collection('topics');
    const result = await topics.aggregate([
      {
        $project: {
          _id: { $toString: "$_id" },
          name: 1,
          articles: { $size: "$articles" },
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
    const topics = db.collection('topics');
    const result = await topics.deleteOne({ _id: new ObjectId(_id) });
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
    const { _id, name } = req.body;
    const { db, client } = await dbConnection();
    // db
    const now = new Date();
    const topics = db.collection('topics');
    const document = await topics.insertOne({
      name: name,
      created: now,
      updated: now,
      articles: [],
      users: [],
    });
    // save paper
    const formatter = new Intl.DateTimeFormat('es', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Bogota' // Ajustar al huso horario deseado
    });
    const data = {
      _id: document.insertedId.toString(),
      name: name,
      updated: formatter.format(now),
      created: formatter.format(now),
      articles: 0,
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
