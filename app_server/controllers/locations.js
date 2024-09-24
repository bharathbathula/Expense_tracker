const Expense = require("../models/expense");

/* GET 'dashboard' page */
const homepage = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 }).limit(10); // Get the most recent 10 expenses

    // Calculate the total sum of expenses
    const totalAmount = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    res.render("dashboard", {
      title: "Home",
      expenses,
      totalAmount, // Pass total amount to the view
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.render("dashboard", {
      title: "Home",
      expenses: [],
      totalAmount: 0, // Fallback if there's an error
    });
  }
};

/* GET 'Add Expense' page */
const addExpense = (req, res) => {
  res.render("addexpense", {
    title: "Add Expense",
    statusMessage: null, // Initialize status message
  });
};

/* POST to add new expense */
const createExpense = async (req, res) => {
  try {
    const { description, amount, date, category } = req.body;

    // Validate the input
    if (!description || !amount || !date || !category) {
      return res.render("addexpense", {
        title: "Add Expense",
        statusMessage: "All fields are required.",
        description,
        amount,
        date,
        category,
      });
    }

    const newExpense = new Expense({
      description,
      amount,
      date,
      category,
    });

    await newExpense.save(); // Save the new expense to the database

    res.render("addexpense", {
      title: "Add Expense",
      statusMessage: "Expense added successfully!",
      description: "", // Clear the form fields
      amount: "",
      date: "",
      category: "",
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.render("addexpense", {
      title: "Add Expense",
      statusMessage: "An error occurred while adding the expense.",
    });
  }
};

// locations.js (controller)
const transactionInfo = async (req, res) => {
  try {
    // Fetch all expenses from the database, sorted by date (most recent first)
    const expenses = await Expense.find().sort({ date: -1 });

    // Aggregate expenses by category
    const aggregatedExpenses = expenses.reduce((acc, expense) => {
      if (acc[expense.category]) {
        acc[expense.category].amount += expense.amount;
      } else {
        acc[expense.category] = {
          category: expense.category,
          amount: expense.amount,
        };
      }
      return acc;
    }, {});

    // Convert the aggregated expenses object back to an array
    const aggregatedExpenseArray = Object.values(aggregatedExpenses);

    // Render the transactions page with both recent expenses and aggregated data
    res.render("transactions", {
      title: "Recent Transactions",
      expenses, // Raw list of expenses for showing latest transactions
      aggregatedExpenses: aggregatedExpenseArray, // Aggregated data for pie chart
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);

    // In case of error, render the page with empty arrays
    res.render("transactions", {
      title: "Recent Transactions",
      expenses: [],
      aggregatedExpenses: [], // Empty array in case of failure
    });
  }
};

module.exports = {
  homepage,
  addExpense,
  createExpense,
  transactionInfo,
};
