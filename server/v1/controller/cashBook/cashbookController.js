const {
  Cashbook,
  Cashdebit,
  Cashcredit,
} = require("../../../model/cashBookModel");

const tryCatch = require("../../../utils/tryCatch");
const appError = require("http-errors");
const appStatus = require("../../../utils/appStatus");
const { parseISO, addDays } = require("date-fns");

const postCashbook = tryCatch(async (req, res, next) => {
  // Extract data from the request body
  const { side, date, name, amount } = req.body;

  // Validate the side (debit or credit)
  if (!["debit", "credit"].includes(side)) {
    return res
      .status(400)
      .json({ error: 'Invalid side. Must be "debit" or "credit".' });
  }

  // cash model based on the side
  let Base;
  if (side === "debit") {
    Base = Cashdebit;
  } else {
    Base = Cashcredit;
  }

  // Create a new entry and date formate
  const parsedDate = parseISO(date);
  const newDate = addDays(parsedDate, 1); // if dont set 1 , get one day less which date you enter

  const newEntry = {
    datex: newDate,
    name,
    amount,
  };

  try {
    // Save the new entry
    const savedEntry = await Base.create(newEntry);

    // Find the cashbook document
    let cashbook = await Cashbook.findOne();

    // If no cashbook document exists, create a new one
    if (!cashbook) {
      cashbook = new Cashbook();
    }

    // Add the new entry to the appropriate side (debit or credit) of the cashbook
    cashbook[side].push(savedEntry._id);

    // Save the updated cashbook document
    const savedCashbook = await cashbook.save();

    return appStatus(201, "Created", savedEntry, res);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const monthlyCahReport = tryCatch(async (req, res, next) => {
  try {
    const { month, year } = req.query;

    // Get the start and end dates of the specified month

    const startDate = new Date(Date.UTC(year, month - 1, 1)); // First day of the specified month
    const endDate = new Date(Date.UTC(year, month, 0)); // Last day of the specified month
    endDate.setUTCDate(endDate.getUTCDate()); // Add one day to get the next day
    endDate.setUTCHours(0, 0, 0, 0); // Set the time to the start of the day
    console.log(startDate, endDate);

    // Calculate the balance difference (dSum - cSum)
    const { dSum, cSum, balanceDifference, crList, drList } =
      await getBalanceDifference(startDate, endDate); // function which calculate all

    // Store the balance difference as the opening balance for the next month in the debit side
    const nextMonthOpeningBalanceEntry = {
      date: new Date(year, month, 2), // First day of the next month
      name: "Opening Balance", // Name for the opening balance entry
      amount: balanceDifference,
    };
    // Check if today's date is the last day of the month
    const today = new Date();
    const isLastDayOfMonth =
      today.getFullYear() === endDate.getFullYear() &&
      today.getMonth() === endDate.getMonth() &&
      today.getDate() === endDate.getDate() - 1;
    // Check if the opening balance entry has already been created for this month
    let cashbook = await Cashbook.findOne();

    const [drC, crC] = await Promise.all([
      Cashdebit.find({}).then((entries) =>
        entries.some(
          (entry) =>
            entry.name === "Opening Balance" &&
            entry.datex.getTime() === new Date(year, month, 2).getTime()
        )
      ),
      Cashcredit.find({}).then((entries) =>
        entries.some(
          (entry) =>
            entry.name === "Opening Balance" &&
            entry.datex.getTime() === new Date(year, month, 2).getTime()
        )
      ),
    ]); // retrun true or false

    // If today is the last day of the month and the opening balance entry hasn't been created yet
    if (isLastDayOfMonth && (!drC || !crC)) {
      const { dSum, cSum, balanceDifference } = await getBalanceDifference(
        startDate,
        endDate
      );

      // Create the opening balance entry
      const openingBalanceEntry = {
        datex: new Date(year, month, 2),
        name: "Opening Balance",
        amount: balanceDifference,
      };

      // Find the cashbook document or create a new one if it doesn't exist

      if (!cashbook) {
        cashbook = new Cashbook();
      }

      let Base;
      let side = "";
      if (balanceDifference > 0) {
        Base = Cashdebit;
        side = "debit";
      } else {
        side = "credit";
        Base = Cashcredit;
      }
      console.log(side);
      const savedEntry = await Base.create(openingBalanceEntry);
      // Save the updated cashbook document
      cashbook[side].push(savedEntry._id);
      await cashbook.save();
      console.log("yes");
    }
    // Send the monthly report as the response
    res.json({
      month,
      year,
      dSum,
      cSum,
      balanceDifference,
      nextMonthOpeningBalanceEntry,
      crList,
      drList,
    });
  } catch (error) {
    console.error("Error generating monthly report:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { postCashbook, monthlyCahReport };

// function calculate dSUm,cSum & balance
async function getBalanceDifference(startDate, endDate) {
  // Query the cashbook documents within the specified month
  const cashbookEntriesDr = await Cashdebit.find({
    datex: { $gte: startDate, $lte: endDate },
  });
  const cashbookEntriesCr = await Cashcredit.find({
    datex: { $gte: startDate, $lte: endDate },
  });

  console.log(cashbookEntriesCr);
  // Calculate the sum of debit amounts (dSum)
  const dSum = cashbookEntriesDr.reduce((total, debit) => {
    return (total += debit.amount);
  }, 0);

  // Calculate the sum of credit amounts (cSum)
  const cSum = cashbookEntriesCr.reduce((total, credit) => {
    return (total += credit.amount);
  }, 0);

  // Calculate the balance difference (dSum - cSum)
  return {
    balanceDifference: dSum - cSum,
    dSum: dSum,
    cSum: cSum,
    drList: cashbookEntriesDr,
    crList: cashbookEntriesCr,
  };
}
