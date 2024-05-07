const Transaction = require("../../model/transactionModel");
const Account = require("../../model/accountModel");
const tryCatch = require("../../utils/tryCatch");
const appError = require("http-errors");
const appStatus = require("../../utils/appStatus");

//new trans
const newTransaction = tryCatch(async (req, res, next) => {
  const { ac_name, ac_id, transaction_name, transaction_by, debit, credit } =
    req.body;

  const addTransaction = new Transaction({
    ac_name,
    ac_id,
    transaction_name,
    transaction_by,
    debit,
    credit,
  });

  const saveTransaction = await addTransaction.save();
  if (!saveTransaction) {
    return next(appError(400, "Try Again"));
  }

  try {
    let mx;
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
        { ac_name: ac_name },
        {
          $push: { transaction_ref_list: saveTransaction._id }, // Add transaction reference to the list
          $inc: { balance: balanceChange }, // Add or subtract amount from balance
        },
        { new: true }
      );
    }
    if (saveTransaction.transaction_type === "cr") {
      console.log("me1");

      // Determine the balance change based on debit or credit amount
      const balanceChange =
        saveTransaction.credit > 0
          ? saveTransaction.credit
          : -saveTransaction.debit;

      // Update the balance and push the transaction reference to the list
      mx = await Account.findOneAndUpdate(
        { ac_name: ac_name },
        {
          $push: { transaction_ref_list: saveTransaction._id }, // Add transaction reference to the list
          $inc: { balance: balanceChange }, // Add or subtract amount from balance
        },
        { new: true }
      );
    }

    console.log("Updated Account:", mx);
    appStatus(201, "Done", saveTransaction, res);
  } catch (error) {
    console.error("Error updating Account:", error);
    return next(appError(500, "Internal Server Error"));
  }
});

//monthly Transcation
const monthlyTranscation = tryCatch(async (req, res, next) => {
  const { ac_name, this_month, page, limit, fileds, sort } = req.query;
  console.log(req.query);
  // Get the current year and month
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // If 'this_month' is not provided, default to the current month
  const monthToQuery = this_month ? parseInt(this_month) : currentMonth;

  // Get the first and last day of the specified month
  const firstDayOfMonth = new Date(currentYear, monthToQuery - 1, 1);
  const lastDayOfMonth = new Date(currentYear, monthToQuery, 0);

  //find transcation
  const transactions = await Transaction.find({
    ac_name,
    createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
  });

  // Group transactions by month
  const monthlyTransactions = {};
  let krd = 0;
  let dbit = 0;
  transactions.forEach((transaction) => {
    const monthYear = `${
      transaction.createdAt.getMonth() + 1
    }-${transaction.createdAt.getFullYear()}`;
    krd += transaction.credit;
    dbit += transaction.debit;
    monthlyTransactions.monthYear = monthYear;
    monthlyTransactions.ac_name = ac_name;
    monthlyTransactions.ac_type = transactions[0].transaction_type;
    if (!monthYear) {
      monthlyTransactions.credit = 0;
      monthlyTransactions.debit = 0;
    } else {
      monthlyTransactions.credit = krd;
      monthlyTransactions.debit = dbit;
    }
  });

  appStatus(200, "doen", { transactions, monthlyTransactions }, res);
});
//delete multiple

const delTransaction = tryCatch(async (req, res, next) => {
  const ids = req.body.ids;

  try {
    for (const id of ids) {
      const mxTa = await Transaction.findByIdAndDelete(id);
      if (!mxTa) {
        throw new Error(`Transaction with ID ${id} not found`);
      }

      // Update account balances based on transaction type
      if (mxTa.transaction_type === "dr") {
        const balanceChange = mxTa.debit > 0 ? -mxTa.debit : mxTa.credit;
        await updateAccountBalance(mxTa.ac_id, id, balanceChange);
      } else if (mxTa.transaction_type === "cr") {
        const balanceChange = mxTa.credit > 0 ? -mxTa.credit : mxTa.debit;
        await updateAccountBalance(mxTa.ac_id, id, balanceChange);
      }
    }

    // Send success response if all transactions were deleted and account balances updated successfully
    appStatus(200, "Transactions deleted successfully", null, res);
  } catch (error) {
    console.error("Error deleting transactions:", error);
    return next(appError(500, "Internal Server Error"));
  }
});
//edit Transcation ****

//########### function **************
async function updateAccountBalance(accountId, transactionId, balanceChange) {
  await Account.findByIdAndUpdate(
    accountId,
    {
      $pull: { transaction_ref_list: transactionId },
      $inc: { balance: balanceChange },
    },
    { new: true }
  );
}

module.exports = { newTransaction, monthlyTranscation, delTransaction };
