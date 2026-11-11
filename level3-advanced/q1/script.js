const taskInput = document.querySelector("#task");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector(".tasks");

const taskCount = document.querySelector("#taskCount");
const pendingCount = document.querySelector("#pendingCount");
const completedCount = document.querySelector("#completedCount");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display task statistics
function updateTaskCount() {
  const total = tasks.length;

  const completed = tasks.filter((task) => {
    return task.completed;
  }).length;

  const pending = tasks.filter((task) => {
    return !task.completed;
  }).length;

  taskCount.textContent = total;
  pendingCount.textContent = pending;
  completedCount.textContent = completed;
}

// Create and display a task
function createTask(task) {
  const list = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = task.text;

  if (task.completed) {
    list.classList.add("completed");
  }

  // Done button
  const doneBtn = document.createElement("button");
  doneBtn.textContent = task.completed ? "Undo" : "Done";

  doneBtn.addEventListener("click", () => {
    task.completed = !task.completed;

    saveTasks();
    displayTasks();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    tasks = tasks.filter((item) => {
      return item !== task;
    });

    saveTasks();
    displayTasks();
  });

  list.append(taskText, doneBtn, deleteBtn);

  taskList.append(list);
}

// Display all tasks
function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    createTask(task);
  });

  updateTaskCount();
}

// Add new task
addBtn.addEventListener("click", () => {
  const taskValue = taskInput.value.trim();

  if (taskValue === "") {
    alert("Please enter a task");
    return;
  }

  const newTask = {
    text: taskValue,
    completed: false,
  };

  tasks.push(newTask);

  saveTasks();
  displayTasks();

  taskInput.value = "";
});

// Initial display
displayTasks();
