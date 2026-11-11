const textData=document.querySelector("#textInput");
const count=document.querySelector("#count");
const remCount=document.querySelector("#remaining");
const warning=document.querySelector("#warning");
let charCount;
let remaining;
textData.addEventListener("input",()=>{
    charCount=textData.value.length;
    count.textContent=`${charCount} / 100 characters`;
    remaining=100-charCount;
    remCount.textContent=`${remaining} characters remaining`;
    if(charCount === 100){
        warning.textContent=`Character count should be less than 100`
    }
    else{
        warning.textContent = "";
    }
});