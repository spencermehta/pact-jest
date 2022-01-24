const axios = require('axios');

exports.handler = async (event) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/1')
    console.log(response)
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
