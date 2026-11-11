const para=document.querySelector("#message");
const button=document.querySelector("#toggleBtn");
button.addEventListener("click",()=>{
    para.classList.toggle("hidden");
});