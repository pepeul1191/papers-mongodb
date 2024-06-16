import axios from 'axios';

export const save = (data) => {
  return new Promise((resolve, reject) => {
    axios.post('/tag/save', data, ).then(function (response) {
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

export const deleteOne = (_id) => {
  return new Promise((resolve, reject) => {
    const data = {_id: _id};
    axios.post('/tag/delete', data)
      .then(response => {
        resolve(_id);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export const fetchAll = () => {
  return new Promise((resolve, reject) => {
    axios.get('/tag/fetch-all')
      .then(response => {
        // Manejar la respuesta exitosa
        console.log(response.data);
        resolve(response.data);
      })
      .catch(error => {
        if (error.response) {
          // Error de respuesta del servidor (por ejemplo, error de 404, 500, etc.)
          if (error.response.status === 404) {
            console.error('Miembro a asociar no existe en el servidor');
          } else {
            console.error('Error en la respuesta del servidor:', error.response.data);
          }
          reject(error.response);
        } else if (error.request) {
          // Error de solicitud (por ejemplo, no hay respuesta del servidor)
          console.error('No se recibió respuesta del servidor:', error.request);
          reject(error.request);
        } else {
          // Otros errores
          console.error('Error al realizar la solicitud:', error.message);
          reject(error.message);
        }
      });
  });
}

