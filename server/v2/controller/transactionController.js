const tryCatch = require("../../utils/tryCatch");
const { Ledger } = require("../../model/v2/ledgerModel");
const { NotFoundError, BadRequestError } = require("../../error/customError");
const appStatus = require("../../utils/appStatus");
const { Transcation_n } = require("../../model/v2/transactionModel");
const { parseISO, addDays } = require("date-fns");
// new transcation
const addTrans = tryCatch(async (req, res, next) => {
  const data = req.body;

  const ledgers = await Ledger.find({});
  const ledgerNames = ledgers.map((ledger) => ledger.ledger_name);

  const isLedgerExists = ledgerNames.includes(data.ledger_type);

  if (!isLedgerExists) {
    return next(new NotFoundError("Account Name Not Found"));
  }

  // Create and save new transaction
  const newTrans = new Transcation_n(data);
  const savedTrans = await newTrans.save();

  if (!savedTrans) {
    return next(new BadRequestError("Try Again"));
  }
  // Send success status
  appStatus(201, savedTrans, req, res, next);
});

// delete
const delTrans = tryCatch(async (req, res, next) => {
  const id = req.params.id;

  const del_trans = await Transcation_n.findByIdAndDelete(id);

  if (!del_trans) {
    return next(
      new BadRequestError("Transaction not found or already deleted")
    );
  }

  appStatus(204, "", req, res, next);
});

// get general transaction

const getGenTrans = tryCatch(async (req, res, next) => {
  const {
    v_no,
    posting_date,
    transation_with,
    page,
    limit,
    fields,
    ledger_type,
    cr_acc,
    this_month,
  } = req.query;
  console.log({ fields });
  let query = {};
  const math = fields ? fields?.split(",")?.join(" ")?.toString() : "";
  //? Get the current year and month
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  //? If 'this_month' is not provided, default to the current month
  const monthToQuery = this_month
    ? parseISO(this_month).getMonth() + 1
    : currentMonth;
  //? Get the first and last day of the specified month
  const firstDayOfMonth = new Date(currentYear, monthToQuery - 1, 1);
  const lastDayOfMonth = new Date(currentYear, monthToQuery, 0);
  query = { createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } };

  //?###### option ####
  let options = {
    select: math,
    lean: true,
    limit: limit,
    page: page,
  };
  //?###### query filter ####
  if (v_no) {
    query.v_no = v_no;
  }
  if (posting_date) {
    query.posting_date = posting_date;
  }
  if (transation_with) {
    query.transation_with = transation_with;
  }

  if (ledger_type) {
    query.$or = [{ ledger_type }, { cr_acc: ledger_type }];
  } else if (cr_acc) {
    query.cr_acc = cr_acc;
  }
  const trans = await Transcation_n.paginate(query, options);
  appStatus(200, trans, req, res, next);
});

module.exports = {
  addTrans,
  delTrans,
  getGenTrans,
};
