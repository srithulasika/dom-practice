const expenseForm = document.querySelector("#expenseForm");
const expenseName = document.querySelector("#expenseName");
const expenseAmount = document.querySelector("#expenseAmount");
const expenseCategory = document.querySelector("#expenseCategory");
const expensesContainer = document.querySelector("#expenses");
const totalElement = document.querySelector("#total");
const filterCategory = document.querySelector("#filterCategory");
const expenseCount = document.querySelector("#expenseCount");

// Load saved expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Save expenses to localStorage
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Add expense
expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = expenseName.value.trim();
  const amount = Number(expenseAmount.value);
  const category = expenseCategory.value;

  // Validate inputs
  if (
    name === "" ||
    expenseAmount.value.trim() === "" ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    category === ""
  ) {
    alert("Please enter valid expense details");
    return;
  }

  // Create expense object
  const expense = {
    id: Date.now(),
    name: name,
    amount: amount,
    category: category,
  };

  // Add expense to array
  expenses.push(expense);

  // Save to localStorage
  saveExpenses();

  // Display expenses
  displayExpenses();

  // Reset form
  expenseForm.reset();
});

// Display expenses
function displayExpenses() {
  expensesContainer.innerHTML = "";

  // Get selected category
  const selectedCategory = filterCategory.value;

  // Filter expenses
  const filteredExpenses = expenses.filter((expense) => {
    return selectedCategory === "all" || expense.category === selectedCategory;
  });

  // Display each expense
  filteredExpenses.forEach((expense) => {
    const div = document.createElement("div");
    div.classList.add("expense-item");

    const details = document.createElement("div");
    details.classList.add("expense-details");

    const heading = document.createElement("h3");
    heading.textContent = expense.name;

    const categoryText = document.createElement("p");
    categoryText.textContent = expense.category;

    const amountText = document.createElement("p");
    amountText.textContent = `₹${expense.amount}`;

    details.append(heading, categoryText, amountText);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", () => {
      expenses = expenses.filter((item) => {
        return item.id !== expense.id;
      });

      saveExpenses();
      displayExpenses();
    });

    div.append(details, deleteButton);

    expensesContainer.append(div);
  });

  // Calculate total expenses
  const total = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  totalElement.textContent = `Total Expenses: ₹${total}`;

  // Display total expense count
  expenseCount.textContent = expenses.length;
}

// Filter expenses
filterCategory.addEventListener("change", () => {
  displayExpenses();
});

// Display saved expenses when page loads
displayExpenses();
