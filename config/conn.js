const axios = require('axios');

const createConnection = async () => {
  const params = {
    usuario: process.env.USER,
    contrasenia: process.env.PASS,
    origen: process.env.ORIGIN
  }

  return await axios.post(process.env.BASE_URL_LOGIN, params)
    .then((response) => response.data.data.token)
    .catch((error) => error);
}


const createInstance = async () => {
  const token = await createConnection();
  const instance = await axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    params: {
      // Agrega los parámetros que necesites aquí
    }
  });

  return instance;
};


module.exports = createInstance