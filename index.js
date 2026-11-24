import "dotenv/config";
import readline from "node:readline";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const imagePath = "/SHUVA/WLiTd/ai-quiz-generator/images/notes.png"; 
const imageData =fs.readFileSync(imagePath).toString("base64");
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
        },
         required: ["questions"],
      }
const configuration = {
      systemInstruction:
        "You are an experienced educational quiz generator that provides the quiz from the notes provided. Make multiple choice questions on the topic and difficulty level moderate, with only one correct answer. Include a short explanation of the correct answer.",
      temperature: 0.9,
      responseMimeType: "application/json",
      responseJsonSchema: resSchema
          };
      
        
    

const prompt =(numberOfQuestions, difficulty) =>[
{
        text: 'Attached is an image of a note. Generate ${numberOfQuestions} ${difficulty} questions based on the image content'
    },
    {
        inlineData: {mimeType: "image/png", data:imageData }
    }
]
const follow_up_request=
[
  "what  is happening in it?"  
];

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main(noQuestions, topic) {
  const history =[];
    history.push({role: "user", parts: prompt(noQuestions,"moderate")});
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: history,
    config: configuration,
    },
  );

  const quiz = JSON.parse(response.text);
      { history.push({role: "model", parts: [{text: response.text}]});}
 quiz.questions.forEach((q, index) => {
    console.log(`\nQuestion ${index + 1}: ${q.question}`);
    console.log(`Options: ${q.options.join(", ")}`);
    console.log(`Correct Answer: ${q.correctAnswer}`);
    console.log(`Difficulty: ${q.difficulty}`);
    console.log(`Explanation: ${q.explanation}`);
  });
 for (const follow_up of follow_up_request)
    {
        history.push ({role: "user",parts: [{text:follow_up}]});
        const response2 = await ai.models.generateContent(
            {
               model: "gemini-3.5-flash-lite", 
               contents: history,
               config : {systemInstruction: configuration.systemInstruction} 
            }
        )
     console.log(response2.text);
    history.push ({role: "model",parts: [{text:response2.text}]});
    }  
}
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the number of questions for the quiz: ", (noQuestions) => {
  rl.question("Enter the topic for the quiz: ", async (topic) => {
  
      {rl.close();}  
    try {
      await main(noQuestions, topic);
    } catch (err) {
      console.error("Failed to generate quiz:", err.message);
    }
  });
});