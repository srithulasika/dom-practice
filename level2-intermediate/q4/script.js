const nameData=document.querySelector("#name");
const ageData=document.querySelector("#age");
const data=document.querySelector("#userForm");
const button=document.querySelector("#btn");
const msg=document.querySelector("#message");
data.addEventListener("submit",(event)=>{
    event.preventDefault();
    const name=nameData.value;
    const age=Number(ageData.value);
    if(!name.trim()){
      msg.textContent="Please enter your name";
    }
    else if(age >= 18){
        msg.textContent=`Hello, ${name}`;
        msg.style.color="green"
    }
    else{
        msg.textContent="You must be 18 or older.";
        msg.style.color = "red";
    }
});
