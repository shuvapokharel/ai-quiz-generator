import "dotenv/config";
import readline from "node:readline";
import { GoogleGenAI } from "@google/genai";
const resSchema ={
        type: "object",
        properties: {
          questions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                options: { type: "array", items: { type: "string" } },
                correctAnswer: { type: "string" },
                difficulty: { type: "string" },
                explanation: { type: "string" },
              },
              required: ["question", "options", "correctAnswer", "difficulty", "explanation"],
            },
          },
        }
      }
const configuration = {
      systemInstruction:
        "You are an experienced educational quiz generator. Make multiple choice questions on the topic and difficulty level provided, with only one correct answer. Include a short explanation of the correct answer.",
      temperature: 0.9,
      responseMimeType: "application/json",
      responseJsonSchema: resSchema
          };
      
        
    

const prompt ="${noQuestions} beginner level multiple choice quiz questions about ${topic}"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main(noQuestions, topic) {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: configuration,
    required: ["questions"],
    },
  );

  const quiz = JSON.parse(response.text);

  quiz.questions.forEach((q, index) => {
    console.log(`\nQuestion ${index + 1}: ${q.question}`);
    console.log(`Options: ${q.options.join(", ")}`);
    console.log(`Correct Answer: ${q.correctAnswer}`);
    console.log(`Difficulty: ${q.difficulty}`);
    console.log(`Explanation: ${q.explanation}`);
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the number of questions for the quiz: ", (noQuestions) => {
  rl.question("Enter the topic for the quiz: ", async (topic) => {
    r1.question("Enter your difficulty level",(difficultylevell))
      {rl.close();}  
    try {
      await main(noQuestions, topic);
    } catch (err) {
      console.error("Failed to generate quiz:", err.message);
    }
  });
});