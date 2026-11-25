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
export const systemInstruction="";