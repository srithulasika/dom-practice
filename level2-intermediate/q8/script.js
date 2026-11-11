const name = document.querySelector("#nameInput");
const saveButton = document.querySelector("#saveBtn");
const msg = document.querySelector("#greeting");
saveButton.addEventListener("click", () => {
  const userName = name.value;
  localStorage.setItem("username", userName);
  msg.textContent = `Welcome, ${userName}`;
});
const savedName = localStorage.getItem("username");
if (savedName) {
  msg.textContent = `Welcome, ${savedName}!`;
} else {
  msg.textContent = "";
}
