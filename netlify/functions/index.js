// require openai
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
  "Access-Control-Allow-Origin": "*", // "wildcard" = any domain calling the endpoint
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // methods to allow
};

// Netlify's serverless function
exports.handler = async function (event, context) {
  // Checking CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    };
  }
  console.log("event console log ", event);

  try {
    // Destructured event.body obj for easier referencing inside prompt.
    const {
      subject,
      level,
      lessonLength,
      topic,
      learningIntention,
      activities,
    } = JSON.parse(event.body);
    console.log(
      "console logging my variables ",
      subject,
      level,
      lessonLength,
      topic,
      learningIntention,
      activities
    );

    // Used prompt engineering to optimize for desired response from OpenAI.
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Prompt: Can you make me a ${lessonLength}-minute lesson plan for a ${level} ${subject} class with a lesson topic of ${topic}. Can you add engaging activities appropriate for the level of the students.

Answer:`,
      max_tokens: 2000,
      temperature: 0.85,
    });

    console.log("The full response object: ", response.data);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: response.data?.choices[0]?.text }),
      headers,
    };
  } catch (error) {
    console.log("ERROR", error);
  }
};
