const ques=document.querySelectorAll(".question");
ques.forEach((question)=>{
    question.addEventListener("click",()=>{
        const answer=question.nextElementSibling;
        answer.classList.toggle("hidden");
    });
});