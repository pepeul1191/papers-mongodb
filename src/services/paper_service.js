import axios from 'axios';

export const save = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'file' && data[key]) {
      formData.append(key, data[key], data[key].name);
    } else if (key === 'file' && !data[key]) {
      formData.append(key, null); // Adjunta null si el archivo es nulo
    } else {
      formData.append(key, data[key]);
    }
  });
  console.log(formData);
  // send
  return new Promise((resolve, reject) => {
    axios.post('/paper/save', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (error) {
      if(error.response.status == 404){
        console.error('Miembro a asociar no existe en el servidor')
      }else{
        console.error(error.response.data);
      }
      reject(error.response);
    })
    .then(function () {
      // todo?
    });
  });
}

export const fetchAll = () => {
  return new Promise((resolve, reject) => {
    axios.get('/paper/fetch-all')
      .then(response => {
        // Manejar la respuesta exitosa
        console.log(response.data)
        resolve(response.data);
      })
    }).catch(function (error) {
      if(error.response.status == 404){
        console.error('Miembro a asociar no existe en el servidor')
      }else{
        console.error(error.response.data);
      }
      reject(error.response);
    });
}

export const fetchOne = (_id) => {
  return new Promise((resolve, reject) => {
    axios.get(`/paper/fetch-one?_id=${_id}`)
      .then(response => {
        // Manejar la respuesta exitosa
        console.log(response.data)
        resolve(response.data);
      })
    }).catch(function (error) {
      if(error.response.status == 404){
        console.error('Miembro a asociar no existe en el servidor')
      }else{
        console.error(error.response.data);
      }
      reject(error.response);
    });
}