import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017'; // Cambia esto según tu configuración

const dbName = 'papers';

const dbConnection = async () => {
  try {
    // Conectarse al servidor de MongoDB
    const client = await MongoClient.connect(url);
    console.log('Conectado correctamente al servidor de MongoDB');

    // Seleccionar la base de datos
    const db = client.db(dbName);

    return { db, client };
  } catch (err) {
    console.error('Error al conectar con MongoDB:', err);
    throw err;
  }
};

export { dbConnection };