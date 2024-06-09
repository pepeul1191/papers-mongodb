import jsYaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Para resolver __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getContent = (file) => {
  const fileRoute = path.join(__dirname, '../api/contents', `${file}_content.yml`);
  return jsYaml.load(fs.readFileSync(fileRoute, 'utf8'));
}

const getTitle = () => {
  const fileRoute = path.join(__dirname, '../api/contents', '_titles.yml');
  return jsYaml.load(fs.readFileSync(fileRoute, 'utf8'));
}

export { getContent, getTitle };
