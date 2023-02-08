require("dotenv").config();
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
   apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
const app = express();
// Initialize the API client

(async function summarizeOrder() {
   const chatData =
      "John Doe ordered 2 items of product X and wants it delivered to 123 Main St.";
   //    Use the GPT-3 API to extract the relevant information
   const modelEngine = "text-davinci-003";
   await openai
      .createCompletion({
         model: modelEngine,
         prompt: `Summarize this chat to an order: ${chatData}`,
         //  max_tokens: 1024,
         //  n: 1,
         //  stop: null,
         temperature: 0.6,
      })
      .then((completions) => {
         console.log(completions.data.choices);
         console.log(completions.data.choices[0].text);
      })
      .catch((error) => {
         console.error(error);
      });
})();
app.get("/", async (req, res) => {
   res.send("Successful response.");
});
app.listen(3000, () => console.log("Example app is listening on port 3000."));
