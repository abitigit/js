const fs = require("fs");
const path = require("path");
import { loadExpensesFromLocalStorage } from "../index.js";
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

jest.dontMock("fs");

describe("Task_2_Main", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "[]"),
        setItem: jest.fn(),
      },
      writable: true,
    });
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    jest.resetModules();
  });

  it("should show Expense List header", () => {
    expect(document.getElementsByTagName("h3")[1].innerHTML).toBe(
      "Expense List"
    );
  });

  it("should show message when no expenses are added", async () => {
    loadExpensesFromLocalStorage();
    expect(document.getElementById("noExpenseMessage").innerHTML).toBe(
      "No Expenses Found"
    );
  });
});
