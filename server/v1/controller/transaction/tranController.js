const Transaction = require("../../../model/transactionModel");
const Account = require("../../../model/accountModel");
const tryCatch = require("../../../utils/tryCatch");
const appError = require("http-errors");
const appStatus= require("../../../utils/appStatus")
const { parseISO, addDays } = require("date-fns");
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
  const {
    ac_name,
    transaction_type,
    this_month,
    page,
    limit,
    fields,
    transaction_name,
    transaction_by,
  } = req.query;

  const math = fields.split(",").join(" ").toString();

  // Get the current year and month
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // If 'this_month' is not provided, default to the current month
  const monthToQuery =
    parseISO(this_month).getMonth() + 1
      ? parseISO(this_month).getMonth() + 1
      : currentMonth;

  // Get the first and last day of the specified month
  const firstDayOfMonth = new Date(currentYear, monthToQuery - 1, 1);
  const lastDayOfMonth = new Date(currentYear, monthToQuery, 0);
  //?###### query filter ####
  let query = { createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } };
  if (ac_name) {
    query.ac_name = ac_name;
  }
  if (transaction_type) {
    query.transaction_type = transaction_type;
  }
  if (transaction_name) {
    query.transaction_name = transaction_name;
  }
  if (transaction_by) {
    query.transaction_by = transaction_by;
  }
  //?###### sort filter ####

  let sort = {};
  if (transaction_name) {
    sort.transaction_name = transaction_name;
  }
  if (transaction_by) {
    sort.transaction_by = transaction_by;
  }
  //?###### option ####
  let options = {
    select: math,
    lean: true,

    limit: limit,
    page: page,
  };

  const transactions = await Transaction.paginate(query, options);

  const monthlyTransactions = {};
  let krd = 0;
  let dbit = 0;
  transactions.docs.forEach((transaction) => {
    const monthYear = `${
      transaction.createdAt.getMonth() + 1
    }-${transaction.createdAt.getFullYear()}`;
    krd += transaction.credit;
    dbit += transaction.debit;
    monthlyTransactions.monthYear = monthYear;
    if (ac_name) {
      monthlyTransactions.ac_name = ac_name;
    }
    if (transaction_type) {
      monthlyTransactions.ac_type = transaction_type;
    } else {
      monthlyTransactions.ac_type = transactions.docs[0].transaction_type;
    }

    if (!monthYear) {
      monthlyTransactions.credit = 0;
      monthlyTransactions.debit = 0;
    } else {
      monthlyTransactions.credit = krd;
      monthlyTransactions.debit = dbit;
    }
  });

  appStatus(200, "done", { transactions, monthlyTransactions }, res);
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
