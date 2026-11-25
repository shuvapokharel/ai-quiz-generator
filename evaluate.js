import {ai,model, systemInstruction} from  './assistant.js';
// define test cases
const testCases=[
    {
        question : 'what is the longest country in world?',
        expected : 'chile'
    },
    {
        question :'what is the capital city of fiji?',
        expected : "suva"
    },
    {
        question : 'what is the largest country in world?',
        expected : 'russia'
    }
]
// evaluate the assistant
async function evaluateAssistant(question) {
const response = await ai.models.generateContent({
    model : model,
    contents : question,
    config: 
    {
        systemInstruction: systemInstruction,
    },
});   
return response.text; 
}
// run evaluation tests
async function runTests(){
    // initialize a counter called passed to keep track of how many tests the assistant passes.
    let passed = 0;
    // iterate through test cases
    for (const test of testCases){
     const response = await evaluateAssistant(test.question);
     
     const ok= response.toLowerCase()
     .includes (test.expected.toLowerCase());

     console.log ('\nQuestion:', test.question);
     console.log ('\n response:',response);
     console.log ('result:', ok? 'PASS':'FAIL');
     if (ok) passed++;
    }
    console.log('\n------------------------');
    console.log('Passed: ${passed}/${testCases.length}');
    console.log ('Pass rate: ${passed/ testCases.length) * 100}%');
}
runTests();