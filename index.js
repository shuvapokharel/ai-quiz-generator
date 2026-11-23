import "dotenv/config";
import { GoogleGenAI, Operations } from "@google/genai";

// initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Make our first api call
async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: "3 quiz questions on beginner level about photosynthesis",
    config: {
      systemInstructions:
        "You are a well experienced education quiz generator. Now make mutiple choice questions on the topic and difficulty level provided by the user, with only one correct answer and Explain the answer after the user chooses an option.",
        temperature : 0.9,
        responseMimeType: "application/json",
        responseJsonSchema:{
            type: "object",
            properties :
            {
                questions:
                {
                    type : "array",
                    items: 
                    {
                        type : "object",
                        properties: 
                        {
                            questions: {
                                type: 'string'
                            },
                            options : 
                            {
                                type : 'array', items: {type : "string"}
                            },
                            correctAnswer: {type: 'string'},
                            difficulty: {type: 'string'},
                        },
                        require : ['question','options','correctAnswer','difficulty']
                    }
                }
            }

        }
        },
  });

  // display the response
  console.log(response.text);
}
main();
