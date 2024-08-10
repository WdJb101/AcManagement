const { paginate } = require("mongoose-paginate-v2");
const { Ledger } = require("../../../model/v2/ledgerModel");
const { Transcation_n } = require("../../../model/v2/transactionModel");
const appStatus = require("../../../utils/appStatus");
const tryCatch = require("../../../utils/tryCatch");

const getLedgerRepo = tryCatch(async (req, res, next) => {
  const { ledger_type, from_date, to_date, page, limit, fields } = req.query;

  //?###### option ####

  const math = fields ? fields?.split(",")?.join(" ")?.toString() : "";
  let options = {
    select: math,
    lean: true,
    limit: limit || 10,
    page: page || 1,
  };

  //?###### query ####
  let query = {
    $or: [{ ledger_type }, { cr_acc: ledger_type }],
    posting_date: { $gte: from_date, $lte: to_date },
  };

  const ledgers = await Ledger.find({});
  const ledgerNames = ledgers.map((ledger) => ledger.ledger_name);

  const isLedgerExists = ledgerNames.includes(ledger_type);

  if (!isLedgerExists) {
    return next(new NotFoundError("Account Name Not Found"));
  }
  const trans = await Transcation_n.paginate(query, options);
  console.log({
    totalDocs: trans.totalDocs,
    limit: trans.limit,
    totalPages: trans.totalPages,
    page: trans.page,
    pagingCounter: trans.pagingCounter,
    hasPrevPage: trans.hasPrevPage,
    hasNextPage: trans.hasNextPage,
    prevPage: trans.prevPage,
    nextPage: trans.nextPage,
  });

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
  appStatus(
    200,
    {
      meow,
      Report: `${ledger_type} A/C`,
      dr_amount,
      cr_amount,
      from_date,
      to_date,
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
