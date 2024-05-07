const Transaction = require("../model/transactionModel");
const Account = require("../model/accountModel");
const tryCatch = require("../utils/tryCatch");
const appError = require("http-errors");
const appStatus = require("../utils/appStatus");
const revenewAsyncExpense = tryCatch(async (req, res, next) => {
  const { ac_name, ac_id, transaction_name, transaction_by, debit, credit } =
    req.body;
  if (!["Expense", "Revenew"].includes(ac_name)) {
    return next();
  }
  let findAc;
  if (ac_name === "Expense") {
    findAc = await Account.findOne({ ac_name: "Revenew" });
  }
  if (ac_name === "Revenew") {
    findAc = await Account.findOne({ ac_name: "Expense" });
  }
  if (!findAc) {
    return next(appError(404, "Corresponding account not found"));
  }

  try {
    let mx;
    const addTransaction = new Transaction({
      ac_name: findAc.ac_name,
      ac_id: findAc._id,
      transaction_name,
      transaction_by,
      debit,
      credit,
    });

    const saveTransaction = await addTransaction.save();
    if (!saveTransaction) {
      return next(appError(400, "Try Again"));
    }
    // Check transaction type to determine debit or credit
    if (saveTransaction.transaction_type === "dr") {
      console.log("me1");

      // Determine the balance change based on debit or credit amount
      const balanceChange =
        saveTransaction.debit > 0
          ? saveTransaction.debit
          : -saveTransaction.credit;

      // Update the balance and push the transaction reference to the list
      mx = await Account.findOneAndUpdate(
        { ac_name: findAc.ac_name },
        {
          $push: { transaction_ref_list: saveTransaction._id }, // Add transaction reference to the list
          $inc: { balance: balanceChange }, // Add or subtract amount from balance
        },
        { new: true }
      );
    }
    if (saveTransaction.transaction_type === "cr") {
      console.log("me2");

      // Determine the balance change based on debit or credit amount
      const balanceChange =
        saveTransaction.credit > 0
          ? saveTransaction.credit
          : -saveTransaction.debit;

      // Update the balance and push the transaction reference to the list
      mx = await Account.findOneAndUpdate(
        { ac_name: findAc.ac_name },
        {
          $push: { transaction_ref_list: saveTransaction._id }, // Add transaction reference to the list
          $inc: { balance: balanceChange }, // Add or subtract amount from balance
        },
        { new: true }
      );
    }
    next();
  } catch (error) {
    console.error("Error updating Account:", error);
    return next(appError(500, "Internal Server Error"));
  }
});

module.exports = revenewAsyncExpense;
