// An express server,  which will handle api request coming in and respond back with a json object, it will use body parser as well as cors.

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const dotenv = require("dotenv");
dotenv.config();

// API credentials
const api_key = process.env.API_KEY;

const configuration = new Configuration({
  organization: "org-oaUsSfZBaz6fJgT00AJcF2Dj",
  apiKey: api_key,
});
const openai = new OpenAIApi(configuration);

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

exports.handler = async function (event, context) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    };
  }
  console.log(event);
  const { message } = JSON.parse(event.body);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 200,
    temperature: 0.5,
  });

  return {
    statusCode: 200,
    body: { message: response.data?.choices[0]?.text },
    headers,
  };
};
