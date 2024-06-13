import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { spawn } from 'child_process';

async function realizarBackup(rutaDestino) {
  const comando = `mongodump --db papers --out ${rutaDestino}`;
  return new Promise((resolve, reject) => {
      const proceso = spawn(comando, { shell: true });
      proceso.on('exit', (codigo) => {
        if (codigo === 0) {
            resolve(rutaDestino);
        } else {
            reject(new Error(`El comando terminó con código de salida ${codigo}`));
        }
      });
      proceso.on('error', (error) => {
          console.error('Error al ejecutar el comando:', error);
          reject(error);
      });
  });
}

async function zipFolder() {
  try {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const folderPath = path.join(__dirname, '../../public/uploads');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const respPath = 'backups/' + uniqueSuffix + '.zip';
    const zipPath = path.join(__dirname, '../../public/' + respPath);
    const rutaBackup = path.join(__dirname, '../../dumps/' + uniqueSuffix + '/');

    // Realizar backup de la base de datos
    await realizarBackup(rutaBackup);

    // Comprimir el directorio en un archivo ZIP
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`Se ha creado el archivo zip correctamente. Tamaño total: ${archive.pointer()} bytes.`);
    });

    output.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.directory(rutaBackup, false);
    await archive.finalize();

    return respPath;
  } catch (error) {
    console.error('Error al realizar el backup y comprimir el archivo ZIP:', error);
    throw error;
  }
}


export { zipFolder };
