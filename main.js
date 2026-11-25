// import the configuration we exported from assistant.js
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import{ai, model, systemInstruction} from  "./assistant.js";

// make api request
async function main(){
    const response = await ai.models.generateContent({
        model: model,
        contents: "who is the prime minister of Nepal?",
        config: {
            systemInstruction : systemInstruction,
            // request JSON output
            responseMimeType: "application/json",

            // define the expected JSON structure
            responseSchema: {
                type: 'OBJECT',
                properties: {
                    question:{
                        type:'STRING'
                    },
                    answer:{
                        type:'STRING'
                    }
                },
                required: ['question','answer']
            }
        }
    });
    // parse gemini's json response
    const result = JSON.parse ( response.text);

    // display the responses
console.log('\nQuestion:', result.question);
console.log('\nAnswer:',result.answer);

}
main();