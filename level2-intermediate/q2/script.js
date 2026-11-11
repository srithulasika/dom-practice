const fruits=["Apple", "Banana", "Mango", "Orange", "Grapes"];
const fruitslist=document.querySelector("#fruitList");
fruits.forEach((fruit)=>{
    const list=document.createElement("li");
    list.textContent=fruit;
    fruitslist.append(list);
});
