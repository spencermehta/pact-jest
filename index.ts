import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda'

exports.handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return {
	statusCode: 200,
	body: 'Hello'
  }
}
