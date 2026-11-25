// import the configuration we exported from assistant.js
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import{ai, model, systemInstruction} from  "./assistant.js";

// make api request
async function main(){
    const response = await ai.models.generateContent({
        model: model,
        contents: "Imagine i am a  engineering student from a urban area from a rich background. can you help me with what should i persure next?",
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