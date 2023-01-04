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

app.post("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.listen(port, () => {
  console.log("Example app listening", port);
});
