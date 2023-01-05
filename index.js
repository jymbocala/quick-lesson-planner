// An express server,  which will handle api request coming in and respond back with a json object, it will use body parser as well as cors.

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
// API credentials
const api_key = process.env.API_KEY

const configuration = new Configuration({
  organization: "org-oaUsSfZBaz6fJgT00AJcF2Dj",
  apiKey: api_key
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  console.log(response.data)
  // When OpenAI comes back with a response, pass it to the front end.
  if(response.data.choices[0].text) {
    res.json({message: response.data.choices[0].text})
  }
});

app.listen(port, () => {
  console.log("Example app listening", port);
});
