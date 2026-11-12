// SELECT HTML ELEMENTS

const transactionForm = document.querySelector("#transactionForm");

const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");

const totalBalance = document.querySelector("#totalBalance");
const totalIncome = document.querySelector("#totalIncome");
const totalExpense = document.querySelector("#totalExpense");

const transactionList = document.querySelector("#transactionList");
const transactionCount = document.querySelector("#transactionCount");

const submitBtn = document.querySelector("#submitBtn");
const cancelEditBtn = document.querySelector("#cancelEditBtn");
const formTitle = document.querySelector("#formTitle");

const filterButtons = document.querySelectorAll(".filter-btn");

// APPLICATION VARIABLES

let transactions = [];

let currentFilter = "all";

let editingId = null;

const STORAGE_KEY = "expenseTrackerTransactions";

// SET TODAY'S DATE

const today = new Date();

const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0"),
].join("-");

dateInput.value = localToday;

//  LOAD DATA FROM LOCAL STORAGE

function loadTransactions() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      if (Array.isArray(parsedData)) {
        transactions = parsedData;
      }
    } catch (error) {
      console.error("Unable to load saved transactions:", error);

      transactions = [];
    }
  }
}

// SAVE DATA TO LOCAL STORAGE

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// FORMAT CURRENCY

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

// UPDATE SUMMARY

function updateSummary() {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => {
      return total + Number(transaction.amount);
    }, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => {
      return total + Number(transaction.amount);
    }, 0);

  const balance = income - expense;

  totalIncome.textContent = formatCurrency(income);

  totalExpense.textContent = formatCurrency(expense);

  totalBalance.textContent = formatCurrency(balance);

  // Show negative balance when expenses exceed income

  totalBalance.style.color = balance < 0 ? "#e34d59" : "#263248";
}

//  DISPLAY TRANSACTIONS

function displayTransactions() {
  transactionList.replaceChildren();

  // Filter transactions based on selected type

  let filteredTransactions = transactions.filter((transaction) => {
    if (currentFilter === "all") {
      return true;
    }

    return transaction.type === currentFilter;
  });

  // Sort newest date first

  filteredTransactions.sort((a, b) => {
    const dateDifference = b.date.localeCompare(a.date);

    if (dateDifference !== 0) {
      return dateDifference;
    }

    return Number(b.id) - Number(a.id);
  });

  // Update transaction count

  transactionCount.textContent = `${filteredTransactions.length} transactions`;

  // Show empty message

  if (filteredTransactions.length === 0) {
    const emptyMessage = document.createElement("p");

    emptyMessage.className = "empty-message";

    emptyMessage.textContent =
      "No transactions found. Add your first transaction!";

    transactionList.appendChild(emptyMessage);

    return;
  }

  // Create transaction elements

  filteredTransactions.forEach((transaction) => {
    const item = document.createElement("div");

    item.className = "transaction-item";

    // Transaction information

    const details = document.createElement("div");

    details.className = "transaction-details";

    const title = document.createElement("h3");

    title.textContent = transaction.description;

    const info = document.createElement("p");

    info.textContent = `${transaction.category} • ${formatDate(transaction.date)}`;

    details.append(title, info);

    // Amount and actions

    const rightSection = document.createElement("div");

    rightSection.className = "transaction-right";

    const amount = document.createElement("span");

    amount.className = `transaction-amount ${transaction.type}`;

    const sign = transaction.type === "income" ? "+" : "-";

    amount.textContent = `${sign}${formatCurrency(transaction.amount)}`;

    // Action buttons

    const actions = document.createElement("div");

    actions.className = "transaction-actions";

    const editButton = document.createElement("button");

    editButton.type = "button";

    editButton.className = "edit-btn";

    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {
      editTransaction(transaction.id);
    });

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";

    deleteButton.className = "delete-btn";

    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      deleteTransaction(transaction.id);
    });

    actions.append(editButton, deleteButton);

    rightSection.append(amount, actions);

    item.append(details, rightSection);

    transactionList.appendChild(item);
  });
}

//  FORMAT DATE

function formatDate(date) {
  const dateObject = new Date(date + "T00:00:00");

  return dateObject.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ADD OR UPDATE TRANSACTION

transactionForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values

  const description = descriptionInput.value.trim();

  const amount = Number(amountInput.value);

  const type = typeInput.value;

  const category = categoryInput.value;

  const date = dateInput.value;

  // Validation

  if (description === "") {
    alert("Please enter a description.");

    descriptionInput.focus();

    return;
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    alert("Please enter a valid amount greater than zero.");

    amountInput.focus();

    return;
  }

  if (!date) {
    alert("Please select a date.");

    dateInput.focus();

    return;
  }

  // Check whether editing or adding

  if (editingId !== null) {
    updateTransaction(description, amount, type, category, date);
  } else {
    addTransaction(description, amount, type, category, date);
  }

  // Reset form

  resetForm();
});

//  ADD TRANSACTION

function addTransaction(description, amount, type, category, date) {
  const transaction = {
    id: Date.now(),

    description: description,

    amount: amount,

    type: type,

    category: category,

    date: date,
  };

  transactions.push(transaction);

  saveTransactions();

  renderApp();
}

// EDIT TRANSACTION

function editTransaction(id) {
  const transaction = transactions.find((item) => {
    return item.id === id;
  });

  if (!transaction) {
    return;
  }

  // Fill the form with existing values

  descriptionInput.value = transaction.description;

  amountInput.value = transaction.amount;

  typeInput.value = transaction.type;

  categoryInput.value = transaction.category;

  dateInput.value = transaction.date;

  // Store the ID of the transaction being edited

  editingId = id;

  // Update form appearance

  formTitle.textContent = "Edit Transaction";

  submitBtn.textContent = "Update Transaction";

  cancelEditBtn.classList.remove("hidden");

  // Scroll to form

  transactionForm.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

// UPDATE TRANSACTION

function updateTransaction(description, amount, type, category, date) {
  transactions = transactions.map((transaction) => {
    if (transaction.id === editingId) {
      return {
        ...transaction,

        description: description,

        amount: amount,

        type: type,

        category: category,

        date: date,
      };
    }

    return transaction;
  });

  saveTransactions();

  renderApp();
}

//  DELETE TRANSACTION

function deleteTransaction(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this transaction?",
  );

  if (!confirmDelete) {
    return;
  }

  transactions = transactions.filter((transaction) => {
    return transaction.id !== id;
  });

  // If the currently edited transaction is deleted

  if (editingId === id) {
    resetForm();
  }

  saveTransactions();

  renderApp();
}

//  FILTER TRANSACTIONS

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to clicked button

    this.classList.add("active");

    // Get selected filter

    currentFilter = this.dataset.filter;

    displayTransactions();
  });
});

// RESET FORM

function resetForm() {
  transactionForm.reset();

  dateInput.value = localToday;

  editingId = null;

  formTitle.textContent = "Add Transaction";

  submitBtn.textContent = "Add Transaction";

  cancelEditBtn.classList.add("hidden");
}

// Cancel editing

cancelEditBtn.addEventListener("click", resetForm);

//  RENDER APPLICATION

function renderApp() {
  updateSummary();

  displayTransactions();
}

// INITIALIZE APPLICATION

loadTransactions();

renderApp();
