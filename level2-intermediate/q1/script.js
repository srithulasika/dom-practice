const paraData = document.querySelector(".output");
const plusData = document.querySelector("#plus");
const minusData = document.querySelector("#minus");
const resetData = document.querySelector("#reset");
let counter = 0;

function updateDisplay() {
  paraData.textContent = counter;
  if (counter >= 0) {
    paraData.style.color = "black";
  } else {
    paraData.style.color = "red";
  }
}

plusData.addEventListener("click", () => {
  counter++;
  updateDisplay();
});
minusData.addEventListener("click", () => {
  counter--;
  updateDisplay();
});

resetData.addEventListener("click", () => {
  counter = 0;
  updateDisplay();
});
