import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

async function zipFolder() {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const folderPath = path.join(__dirname, '../../public/uploads');
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const respPath = 'backups/' + uniqueSuffix + '.zip';
  const zipPath = path.join(__dirname, '../../public/' + respPath);

  return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', {
          zlib: { level: 9 } // Nivel de compresión máximo
      });
      output.on('close', () => {
          console.log(`Se ha creado el archivo zip correctamente. Tamaño total: ${archive.pointer()} bytes.`);
          resolve(respPath);
      });
      output.on('error', (err) => {
          reject(err);
      });
      archive.pipe(output);
      // Añadir la carpeta al archivo zip
      archive.directory(folderPath, false);
      // Finalizar la creación del archivo zip
      archive.finalize();
  });
}

export { zipFolder };
