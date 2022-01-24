const axios = require('axios');

exports.handler = async (event) => {
  try {
    const response = axios.get('https://pokeapi.co/api/v2/pokemon/1')
    return JSON.stringify(response)
  } catch (error) {
    // return {
    //   statusCode: 500,
    //   body: JSON.stringify(error)
    // }
    console.log(error);
  }
}
