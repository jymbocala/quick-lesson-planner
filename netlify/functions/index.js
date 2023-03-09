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
  console.log("event console log: ", event);

  try {
    // Destructured event.body obj for easier referencing inside prompt.
    const {
      subject,
      level,
      lessonLength,
      topic,
      activities,
    } = JSON.parse(event.body);
    console.log(
      "console logging my variables ",
      subject,
      level,
      lessonLength,
      topic,
      activities
    );

    // OpenAI Chat completion request
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert Highschool Teacher that is tasked to teach a ${subject} class.`,
        },
        {
          role: "user",
          content: `Create an effective lesson plan for the ${subject} lesson with the main topic as '${topic}'. The lesson should be appropriate for ${level} students. The lesson is ${lessonLength} minutes long, include time durations for each task. Include these activities ${activities}, and fill out the rest of the lesson with fun and engaging activities`,
        },
      ],
      max_tokens: 2048,
      temperature: 0.8,
    });

    console.log("full response data: ", response.data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: response.data?.choices[0]?.message.content,
      }),
      headers,
    };
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
