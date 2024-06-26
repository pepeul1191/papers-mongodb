import axios from 'axios';

export const uploadOne = (data) => {
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
    axios.post('/image/save', formData, {
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

export const deleteOne = (_id) => {
  return new Promise((resolve, reject) => {
    const data = {_id: _id};
    axios.post('/image/delete', data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
