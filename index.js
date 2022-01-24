const axios = require('axios');

exports.handler = async (event) => {
  const url = event.url

  try {
    const response = await axios.request({
      method: "GET",
      baseURL: url,
      url: "/stations",
      headers: { Accept: "application/json" },
    })
    console.log(response)
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
