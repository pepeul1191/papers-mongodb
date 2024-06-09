import constants from './constants.js';

const loadCss = (csss) => {
  let resp = '';
  if (typeof csss !== 'undefined') {
    for (let i = 0; i < csss.length; i++) {
      resp += `<link rel="stylesheet" type="text/css" href="${constants().static_url}${csss[i]}.css" />`;
    }
  }
  return resp;
}

const loadJs = (jss) => {
  let resp = '';
  if (typeof jss !== 'undefined') {
    for (let i = 0; i < jss.length; i++) {
      resp += `<script src="${constants().static_url}${jss[i]}.js"></script>`;
    }
  }
  return resp;
}

const randomSN = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export { loadCss, loadJs, randomSN };
