import fs from 'fs';
import express from 'express';
import multer from 'multer';
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

router.post('/delete', async (req, res, next) => {
  try {
    const { _id } = req.body;
    const { db, client } = await dbConnection();
    // create or update document
    const images = db.collection('images');
    const result = await images.deleteOne({ _id: new ObjectId(_id) });
    client.close();
    // Comprueba si se eliminó un documento correctamente
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

router.post('/save', upload.single('file'), async (req, res, next) => {
  try {
    const { _id, name, file_url, } = req.body;
    const generatedFileUrl = req.generatedFileUrl;
    const { db, client } = await dbConnection();
    // create imagen
    const images = db.collection('images');
    const now = new Date();
    const doc = await images.insertOne({
      name: name,
      file_url: generatedFileUrl,
      created: now 
    });
    //console.log(doc);
    // save paper
    // update papers images
    const papers = db.collection('papers');
    await papers.updateOne(
      { _id: new ObjectId(_id) },
      { $push: { images: doc.insertedId } }
    );
    client.close();
    // Retorna el ID de la palabra clave insertada o encontrada
    res.status(200).send({
      _id: doc.insertedId, 
      created: now,
      url: generatedFileUrl,
    });
  } catch (error) {
    console.error('Error al manejar la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


export default router;
