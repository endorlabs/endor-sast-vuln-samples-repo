// Import the OpenAI SDK library
import * as OpenAI from 'ai.openai.sdk';

// Set up the API key
//ruleid: gen-openai-apikey
OpenAI.setApiKey('sk-abcdefghijklmopqrstuvwxyz1234567890abcdefghijklm');
//ruleid: gen-openai-apikey
OpenAI.apiKey = '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'; // endorctl:allow
// Set the API URL

OpenAI.apiURL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

   // okruleid: gen-openai-apikey
    //OPENAI_API_KEY="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"; // endorctl:allow
       // okruleid: gen-openai-apikey
    OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";


// Create a completion request
const completionRequest = {
engine: 'davinci',
prompt: 'Hello,',
maxTokens: 5,
};

// Call the completion API
const completionResponse = await OpenAI.getCompletion(completionRequest);

// Print the generated text
console.log(completionResponse.choices[0].text);

// Create a classification request
const classificationRequest = {
model: 'YOUR_MODEL_ID',
query: 'Hello, world!',
examples: [
{
document: 'Hello, world!',
label: 'greeting',
},
{
document: 'The quick brown fox jumps over the lazy dog.',
label: 'non-greeting',
},
],
};

// Call the classification API
const classificationResponse = await OpenAI.getClassification(classificationRequest);

// Print the classification result
console.log(classificationResponse.label);


