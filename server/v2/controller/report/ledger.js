const { paginate } = require("mongoose-paginate-v2");
const { Ledger } = require("../../../model/v2/ledgerModel");
const { Transcation_n } = require("../../../model/v2/transactionModel");
const appStatus = require("../../../utils/appStatus");
const tryCatch = require("../../../utils/tryCatch");
const { NotFoundError } = require("../../../error/customError");

const getLedgerRepo = tryCatch(async (req, res, next) => {
  const { ledger_type, from_date, to_date, page, limit, fields } = req.query;

  //?###### option ####

  const math = fields ? fields?.split(",")?.join(" ")?.toString() : "";
  let options = {
    select: math,
    lean: true,
    limit: limit || 100,
    page: page || 1,
  };

  //?###### query ####
  let query = {
    $or: [{ ledger_type }, { cr_acc: ledger_type }],
    posting_date: { $gte: from_date, $lte: to_date },
  };
  //?###### check ####
  const ledgers = await Ledger.find({});
  const ledgerNames = ledgers.map((ledger) => ledger.ledger_name);

  const isLedgerExists = ledgerNames.includes(ledger_type);

  if (!isLedgerExists) {
    return next(new NotFoundError("Account Name Not Found"));
  }

  //?###### find && sum ####
  const trans = await Transcation_n.paginate(query, options);

  let meow = [];
  const dr_amount = trans.docs.reduce((prev, next) => {
    if (next.balance_type === "dr") {
      return prev + next.amount;
    }
    return prev;
  }, 0);
  const cr_amount = trans.docs.reduce((prev, next) => {
    if (next.balance_type === "cr") {
      return prev + next.amount;
    }
    return prev;
  }, 0);

  trans.docs.forEach((item) => {
    if (item.ledger_type === ledger_type) {
      meow.push({
        posting_date: item.posting_date,
        narration: item.narration,
        dr_amount: item.balance_type === "dr" ? item.amount : 0,
        cr_amount: item.balance_type === "cr" ? item.amount : 0,
        Particulars: item.cr_acc,
        v_no: item.v_no,
      });
    } else {
      meow.push({
        posting_date: item.posting_date,
        narration: item.narration,
        dr_amount: item.balance_type === "dr" ? item.amount : 0,
        cr_amount: item.balance_type === "cr" ? item.amount : 0,
        Particulars: item.ledger_type,
        v_no: item.v_no,
      });
    }
  });
  //? ### find Sum end####
  //?###### drSum & crSum & opening closing ####
  const fromDate = new Date(from_date);

  const results = await Transcation_n.aggregate([
    {
      $match: {
        $or: [{ ledger_type }, { cr_acc: ledger_type }],
        posting_date: { $lt: fromDate },
      },
    },
    {
      $group: {
        _id: "$balance_type",
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  let drSum = 0;
  let crSum = 0;
  results.forEach((result) => {
    if (result._id === "dr") {
      drSum = result.totalAmount;
    } else if (result._id === "cr") {
      crSum = result.totalAmount;
    }
  });

  const openning = {
    dr_opening: drSum > crSum ? drSum - crSum : 0,
    cr_opening: crSum > drSum ? crSum - drSum : 0,
  };
  const sum = {
    dr_sum: drSum + openning.dr_opening,
    cr_sum: crSum + openning.cr_opening,
  };

  const closing = {
    dr_closing: sum.cr_sum,
    cr_closing: sum.dr_sum,
  };

  const total = {
    dr_sum_clg: sum.dr_sum + closing.dr_closing,
    cr_sum_clg: sum.cr_sum + closing.cr_closing,
  };
  console.log(total);
  //?######drSum & crSum & opening closing __end ####

  appStatus(
    200,
    {
      meow,
      Report: `${ledger_type} A/C`,
      dr_amount,
      cr_amount,
      from_date,
      to_date,
      openning,
      sum,
      closing,
      total,
      paginate: {
        totalDocs: trans.totalDocs,
        limit: trans.limit,
        totalPages: trans.totalPages,
        page: trans.page,
        pagingCounter: trans.pagingCounter,
        hasPrevPage: trans.hasPrevPage,
        hasNextPage: trans.hasNextPage,
        prevPage: trans.prevPage,
        nextPage: trans.nextPage,
      },
    },
    req,
    res,
    next
  );
});

module.exports = {
  getLedgerRepo,
};
