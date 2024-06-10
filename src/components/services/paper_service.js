import axios from 'axios';

export const save = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'file') {
      formData.append(key, data[key], data[key].name);
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