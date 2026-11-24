import "dotenv/config";
import { GoogleGenAI } from "@google/genai"; 
import fs from "fs";


const ai= new GoogleGenAI(
    {
        apiKey: process.env.GEMINI_API_KEY,
    }
);
const imagePath = "/SHUVA/WLiTd/ai-quiz-generator/images/meme.jpg"; 
const imageData =fs.readFileSync(imagePath).toString("base64");
const prompt =
[
    {
        text: "Describe this image in detail" 
    },
    {
        inlineData: {mimeType: "image/jpg", data:imageData }
    }
]
const follow_up_request=
[
  "what  is happening in it?"  
];
async function  main(){
    const history =[];
    history.push({role: "user", parts: prompt});
    const response= await ai.models.generateContent(
        {
            model: "gemini-3.5-flash-lite",
             contents: history  
        }
    );
    console.log(response.text);
    history.push({role: "model", parts: [{text: response.text}]});
    for (const follow_up of follow_up_request)
    {
        history.push ({role: "user",parts: [{text:follow_up}]});
        const response2 = await ai.models.generateContent(
            {
               model: "gemini-3.5-flash-lite", 
               contents: history   
            }
        )
     console.log(response2.text);
    history.push ({role: "model",parts: [{text:response2.text}]});
    }  
}
main();