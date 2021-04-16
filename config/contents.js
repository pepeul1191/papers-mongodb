var jsYaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

const getContent = (file) => {
  let fileRoute = path.join(__dirname, '../api/contents', file + '_content.yml')
  return jsYaml.load(fs.readFileSync(fileRoute), 'utf8')
}

const getTitle = () => {
  let fileRoute = path.join(__dirname, '../api/contents', '_titles.yml')
  return jsYaml.load(fs.readFileSync(fileRoute), 'utf8')
}

exports.getContent= getContent;
exports.getTitle= getTitle;
