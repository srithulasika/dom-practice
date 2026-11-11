const bodyContent=document.querySelector("body");
const toggleButton=document.querySelector("#toggle-theme");
toggleButton.addEventListener("click",()=>{
    bodyContent.classList.toggle("dark-theme");
     bodyContent.classList.toggle("light-theme");
})