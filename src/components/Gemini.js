import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// const apiKey = "AIzaSyBgklGMa1UlBS_O4tXrMjfib6ulVbkUXZw";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "tunedModels/test-model-vlho84n7drnl",
});

const generationConfig = {
  temperature: 0.6,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: "text/plain",
};

async function runChat(prompt) {
  const chatSession = model.startChat({
    generationConfig,
  });

  const result = await chatSession.sendMessage(prompt);
  const response = result.response;
  const candidates = result.response.candidates;

  // Log the response text to the console
  candidates.forEach((candidate) => {
    console.log(candidate.content.text);
  });
  return response.text();
}

export default runChat;