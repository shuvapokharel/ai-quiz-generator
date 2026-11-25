// import dependencies
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

// initialize the api client
export const ai= new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY,
});
// specify the model
export const model= "gemini-3.5-flash-lite";

// define system instructions
export const systemInstruction="Explain accurately and clearly. use simple language. do not invent facts and statistics or refrences. if you are unsure please say so . politely correct false premises. ask for clarification when information is missing. donot present gusses as facts.";