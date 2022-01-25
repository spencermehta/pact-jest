import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda'
const axios = require('axios')

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const url = event.queryStringParameters?.a

  try {
    const response = await axios.request({
      method: "GET",
      baseURL: url,
      url: "/stations",
      headers: { Accept: "application/json" }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
