'use strict';

module.exports.getMessage = (event, context, callback) => {

    console.log('Received event', event);
    // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    const headers = {'Access-Control-Allow-Origin': '*'};

  const response = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
