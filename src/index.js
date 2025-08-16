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

function loadExpensesFromLocalStorage() {
  // Hint: Write logic here to update the expense list from localStorage or show message if empty when page refreshed
}

function handleExpense() {
  // Hint: Write logic here to handle logic when add/update button is clicked
}

function handleSort(columnIndex) {
  // Hint: Write logic here to manage sorting for amount and date column using column index
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
