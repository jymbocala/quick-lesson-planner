// An express server,  which will handle api request coming in and respond back with a json object, it will use body parser as well as cors.

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: "org-oaUsSfZBaz6fJgT00AJcF2Dj",
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });
  console.log(response.data)
  // When OpenAI comes back with a response, pass it to the front end.
  if(response.data.choices[0].text) {
    res.json({message: response.data.choices[0].text})
  }
  res.json({
    message: "Hello World!",
  });
});

app.listen(port, () => {
  console.log("Example app listening", port);
});
