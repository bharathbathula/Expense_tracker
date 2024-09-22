/* GET 'home' page */
const homepage = (req, res) => {
  res.render("dashboard", { title: "Home" });
};
/* GET 'Location info' page */
const transactionInfo = (req, res) => {
  res.render("transactions", { title: "recent transactions" });
};
/* GET 'Add review' page */
const addExpense = (req, res) => {
  res.render("addexpense", { title: "Add expenses" });
};
module.exports = {
  homepage,
  transactionInfo,
  addExpense,
};
