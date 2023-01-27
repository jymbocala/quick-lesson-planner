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
  // Destructured event.body obj for easier referencing inside prompt.
  const { subject, level, lessonLength, topic, learningIntention, activities } = JSON.parse(
    event.body
  );
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
    prompt: `Prompt: Can you make me a one-page, 50 minutes lesson plan for a Year 10 (students aged 14-16)English class including these ideas/activities:
Lesson Context/ Topic: Romeo and Juliet
The learning intention of the lesson is to: analyse the consequence of bad decision-making.
1. Intro Discussion
-  After Romeo Kills Tybalt, what are the problems facing Romeo Juliet?
2. Analysis Task
- Students to make a flowchart to summarise the plan.
- Identify problems in each stage of the plan.
3. Class discussion
    
Answer:
Learning Intention: Analyse the consequence of bad decision-making.

Introduction (5 minutes):
Watch the plot summary of Romeo and Juliet to refresh students' memory of the overall storyline

Class discussion (5 minutes):
- After Romeo kills Tybalt, what are the problems facing Romeo and Juliet?
- Brainstorm the possible issue in students' books

Table Read Activity (10 minutes): 
1. Friar Laurence’s speech Act 4, Scene 1 (pg. 70-73) 
2.  Analyse the speech
- Meaning
- The impact of the speech on Juliet

Analysis Task (15 minutes):
1. Students are to summarise the plan into 6 clear steps as a flow chart
2. Identify any possible problems at each stage.
3. In pairs, students are to discuss and answer ‘Can you think of a better plan than the one that the Friar came up with?’

Class Discussion (10 minutes):
1. Do you think that the Friar was wise and responsible for helping Juliet in this way?
2. If you were Juliet, would you have gone through with this plan?
3. Do you think it was selfish of Juliet to want to fake her own death? To put her parents through that?

Exit Ticket (5 minutes): 
- Based on the ideas in Romeo and Juliet, how do bad decisions create damage in families and communities?
    
Prompt: Can you make me ${lessonLength} minutes lesson plan for a ${level} ${subject} class including these ideas/activities:
Lesson Context/ Topic: ${topic}
The learning intention of the lesson is to: ${learningIntention}
${activities}

Answer:`,
    max_tokens: 2000,
    temperature: 0.85,
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: response.data?.choices[0]?.text }),
    headers,
  };
};
