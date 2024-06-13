import axios from 'axios';

export const save = (data) => {
  return new Promise((resolve, reject) => {
    axios.post('/topic/save', data, ).then(function (response) {
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
    axios.post('/topic/delete', data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export const fetchAll = () => {
  return new Promise((resolve, reject) => {
    axios.get('/topic/fetch-all')
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

export const fetchBackup = () => {
  return new Promise((resolve, reject) => {
    axios.get('/topic/backup')
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
