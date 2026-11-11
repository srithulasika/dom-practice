const inputData=document.querySelector("input");
const outputData=document.querySelector("#output");
inputData.addEventListener("input",()=>{
    outputData.textContent=inputData.value;
})