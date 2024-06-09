import constants from '../../config/constants.js';

const indexCss = () => {
  let resp = [];
  if (constants.static === 'dev') {
    resp = [
      'build/bundle',
    ];
  }
  if (constants.static === 'build') {
    resp = [
      'dist/test.min'
    ];
  }
  return resp;
}

const indexJs = () => {
  let resp = [];
  if (constants.static === 'dev') {
    resp = [
      'build/bundle',
    ];
  }
  if (constants.static === 'build') {
    resp = [];
  }
  return resp;
}

export { indexCss, indexJs };
