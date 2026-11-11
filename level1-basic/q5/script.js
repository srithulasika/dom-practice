const alertButton=document.querySelector("#alertBtn");

//using onclick
alertButton.onclick = function (){
    alert("Hello! Welcome to JavaScript");
};

//using addEventListener

alertButton.addEventListener("click",()=>{
    alert("Hello! Welcome to JavaScript")
});