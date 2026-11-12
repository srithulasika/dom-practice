// Select HTML elements

const taskForm = document.querySelector("#taskForm");

const taskTitle = document.querySelector("#taskTitle");
const taskDescription = document.querySelector("#taskDescription");
const taskCategory = document.querySelector("#taskCategory");
const taskPriority = document.querySelector("#taskPriority");
const taskDueDate = document.querySelector("#taskDueDate");

const addTaskBtn = document.querySelector("#addTaskBtn");
const cancelBtn = document.querySelector("#cancelBtn");

const formSection = document.querySelector("#formSection");
const formTitle = document.querySelector("#formTitle");
const submitBtn = taskForm.querySelector('button[type="submit"]');

const taskList = document.querySelector("#taskList");
const searchInput = document.querySelector("#searchInput");

const filterButtons = document.querySelectorAll("[data-filter]");
const categoryButtons = document.querySelectorAll("[data-category]");

// Task data

let tasks = JSON.parse(localStorage.getItem("taskflowTasks")) || [];

let editingTaskId = null;

let currentFilter = "all";
let currentCategory = "all";

// Save tasks to localStorage

function saveTasks() {
    localStorage.setItem("taskflowTasks", JSON.stringify(tasks));
}

// Show add task form

addTaskBtn.addEventListener("click", () => {
    editingTaskId = null;

    taskForm.reset();

    formTitle.textContent = "Add New Task";
    submitBtn.textContent = "Add Task";

    formSection.classList.add("show");
});

// Cancel form

cancelBtn.addEventListener("click", () => {
    resetForm();
});

// Reset form

function resetForm() {
    taskForm.reset();

    editingTaskId = null;

    formSection.classList.remove("show");

    formTitle.textContent = "Add New Task";
    submitBtn.textContent = "Add Task";
}

// Escape HTML

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[character];
    });
}

// Add or update task

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const category = taskCategory.value;
    const priority = taskPriority.value;
    const dueDate = taskDueDate.value;

    if (title === "" || dueDate === "") {
        alert("Please enter task title and due date.");
        return;
    }

    if (editingTaskId !== null) {
        const existingTask = tasks.find(
            (task) => task.id === editingTaskId
        );

        if (!existingTask) {
            return;
        }

        existingTask.title = title;
        existingTask.description = description;
        existingTask.category = category;
        existingTask.priority = priority;
        existingTask.dueDate = dueDate;
    } else {
        const newTask = {
            id: crypto.randomUUID(),
            title: title,
            description: description,
            category: category,
            priority: priority,
            dueDate: dueDate,
            completed: false
        };

        tasks.unshift(newTask);
    }

    saveTasks();
    renderTasks();
    resetForm();
});

// Search tasks

searchInput.addEventListener("input", () => {
    renderTasks();
});

// Filter by status

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderTasks();
    });
});

// Filter by category

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentCategory = button.dataset.category;

        categoryButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderTasks();
    });
});

// Display and filter tasks

function renderTasks() {
    taskList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase().trim();

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(searchText) ||
            task.description.toLowerCase().includes(searchText);

        const matchesStatus =
            currentFilter === "all" ||
            (currentFilter === "pending" && !task.completed) ||
            (currentFilter === "completed" && task.completed);

        const matchesCategory =
            currentCategory === "all" ||
            task.category === currentCategory;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state show">
                <h3>No tasks found!</h3>
                <p>Try changing your search or filters.</p>
            </div>
        `;

        updateStatistics();
        return;
    }

    filteredTasks.forEach((task) => {
        const card = document.createElement("article");

        card.className = `task-card ${task.completed ? "completed" : ""}`;

        card.innerHTML = `
            <span class="priority ${escapeHTML(task.priority.toLowerCase())}">
                ${escapeHTML(task.priority)} Priority
            </span>

            <span class="category">
                ${escapeHTML(task.category)}
            </span>

            <h3>${escapeHTML(task.title)}</h3>

            <p>
                ${escapeHTML(task.description || "No description provided.")}
            </p>

            <p>📅 Due Date: ${escapeHTML(task.dueDate)}</p>

            <div class="task-actions">
                <button
                    class="complete-btn"
                    data-action="toggle"
                    data-id="${escapeHTML(task.id)}"
                >
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button
                    class="edit-btn"
                    data-action="edit"
                    data-id="${escapeHTML(task.id)}"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    data-action="delete"
                    data-id="${escapeHTML(task.id)}"
                >
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(card);
    });

    updateStatistics();
}

// Handle task actions

taskList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const action = button.dataset.action;
    const taskId = button.dataset.id;

    const task = tasks.find(
        (item) => item.id === taskId
    );

    if (!task) {
        return;
    }

    if (action === "toggle") {
        task.completed = !task.completed;

        saveTasks();
        renderTasks();
    }

    else if (action === "edit") {
        editingTaskId = task.id;

        taskTitle.value = task.title;
        taskDescription.value = task.description;
        taskCategory.value = task.category;
        taskPriority.value = task.priority;
        taskDueDate.value = task.dueDate;

        formSection.classList.add("show");

        formTitle.textContent = "Edit Task";
        submitBtn.textContent = "Update Task";
    }

    else if (action === "delete") {
        const confirmDelete = confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {
            return;
        }

        tasks = tasks.filter(
            (item) => item.id !== taskId
        );

        saveTasks();

        if (editingTaskId === taskId) {
            resetForm();
        }

        renderTasks();
    }
});

// Update dashboard statistics

function updateStatistics() {
    const total = tasks.length;

    const completed = tasks.filter(
        (task) => task.completed === true
    ).length;

    const pending = total - completed;

    const completionRate = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.querySelector("#totalTasks").textContent = total;
    document.querySelector("#pendingTasks").textContent = pending;
    document.querySelector("#completedTasks").textContent = completed;
    document.querySelector("#completionRate").textContent =
        completionRate + "%";
}

// Display saved tasks when the page loads

renderTasks();
