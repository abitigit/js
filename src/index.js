document.addEventListener("DOMContentLoaded", () => {
  loadExpensesFromLocalStorage();
});

// Use below object to show different messages
const messages = {
  emptyFields: "Please fill in all fields with valid values", // Error message to show when form submitted with empty fields
  titleValidationFailed: "Title should be between 1 and 20 characters", // Error message to show when title validation failed
  amountValidationFailed: "Amount should be between 1 and 100000 USD", // Error message to show when amount validation failed
  expenseAddedSuccess: "Expense added successfully!", // Success message to show when expense added successfully
  expenseUpdatedSuccess: "Expense updated successfully!", // Success message to show when expense updated successfully
  deleteSuccess: "Expense deleted successfully!", // Success message to show when expense deleted successfully
};

let expenses = [];
let editId = null;

function renderExpenses() {
  const expenseTableBody = document.querySelector("#expenseTable tbody");
  const totalExpenseValue = document.getElementById("totalExpenseValue");
  const noExpenseMessage = document.getElementById("noExpenseMessage");
  const expenseInfo = document.getElementById("expenseInfo");

  expenseTableBody.innerHTML = "";

  if (expenses.length === 0) {
    noExpenseMessage.textContent = "No Expenses Found";
    expenseInfo.style.display = "none";
    return;
  }

  noExpenseMessage.textContent = "";
  expenseInfo.style.display = "block";

  let totalAmount = 0;
  expenses.forEach((expense) => {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = expense.title;
    row.appendChild(titleCell);

    const amountCell = document.createElement("td");
    amountCell.textContent = `$${parseFloat(expense.amount).toFixed(2)}`;
    row.appendChild(amountCell);

    const dateCell = document.createElement("td");
    dateCell.textContent = expense.date;
    row.appendChild(dateCell);

    const actionCell = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", () => editExpense(expense.id));
    actionCell.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => deleteExpense(expense.id));
    actionCell.appendChild(deleteButton);

    row.appendChild(actionCell);

    expenseTableBody.appendChild(row);
    totalAmount += parseFloat(expense.amount);
  });

  totalExpenseValue.textContent = `$${totalAmount.toFixed(2)}`;
}

function loadExpensesFromLocalStorage() {
  const localExpenses = localStorage.getItem("expenses");
  if (localExpenses) {
    expenses = JSON.parse(localExpenses).map((expense, index) => ({
      ...expense,
      id: expense.id || new Date().getTime().toString() + index,
    }));
  }
  renderExpenses();
}

function handleExpense() {
  const titleInput = document.getElementById("title");
  const amountInput = document.getElementById("amount");
  const dateInput = document.getElementById("date");
  const message = document.getElementById("message");

  const title = titleInput.value.trim();
  const amount = amountInput.value.trim();
  const date = dateInput.value;

  if (!title || !amount || !date) {
    message.textContent = messages.emptyFields;
    return;
  }

  if (title.length > 20) {
    message.textContent = messages.titleValidationFailed;
    return;
  }

  if (parseFloat(amount) < 1 || parseFloat(amount) > 100000) {
    message.textContent = messages.amountValidationFailed;
    return;
  }

  const expense = {
    id: editId ? editId : new Date().getTime().toString(),
    title,
    amount,
    date,
  };

  if (editId) {
    const index = expenses.findIndex((exp) => exp.id === editId);
    expenses[index] = expense;
    message.textContent = messages.expenseUpdatedSuccess;
    document.getElementById("expenseActionTitle").textContent = "Add Expense";
    document.getElementById("addOrUpdateExpenseButton").textContent = "Add";
    editId = null;
  } else {
    expenses.push(expense);
    message.textContent = messages.expenseAddedSuccess;
  }

  localStorage.setItem("expenses", JSON.stringify(expenses));
  titleInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
  renderExpenses();

  setTimeout(() => {
    message.textContent = "";
  }, 2000);
}

function editExpense(id) {
  const expense = expenses.find((exp) => exp.id === id);
  if (expense) {
    document.getElementById("title").value = expense.title;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("date").value = expense.date;
    document.getElementById("expenseActionTitle").innerHTML = "Update Expense";
    document.getElementById("addOrUpdateExpenseButton").textContent = "Update";
    editId = id;
  }
}

function deleteExpense(id) {
  expenses = expenses.filter((exp) => exp.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
  const message = document.getElementById("delete-message");
  message.textContent = messages.deleteSuccess;
  setTimeout(() => {
    message.textContent = "";
  }, 2000);
}

let sortDirection = { 1: 'asc', 2: 'asc' };

function handleSort(columnIndex) {
  const isAmountSort = columnIndex === 1;
  const key = isAmountSort ? 'amount' : 'date';
  const direction = sortDirection[columnIndex];

  expenses.sort((a, b) => {
    if (isAmountSort) {
      return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
    } else {
      return direction === 'asc' ? new Date(a[key]) - new Date(b[key]) : new Date(b[key]) - new Date(a[key]);
    }
  });

  sortDirection[columnIndex] = direction === 'asc' ? 'desc' : 'asc';
  renderExpenses();
}

// Export functions for testing purposes.
// DO NOT EDIT THIS BLOCK
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadExpensesFromLocalStorage,
    handleExpense,
    handleSort
  };
}
