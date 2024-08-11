const { BadRequestError, NotFoundError } = require("../../error/customError");
const { Ledger } = require("../../model/v2/ledgerModel");
const appStatus = require("../../utils/appStatus");
const tryCatch = require("../../utils/tryCatch");

// add
const addLedger = tryCatch(async (req, res, next) => {
  const { ledger_name, acc_group } = req.body;

  const ifExist = await Ledger.findOne({ ledger_name, acc_group });

  if (ifExist) {
    return next(new BadRequestError("Already Exist"));
  }

  const new_ledger = new Ledger(req.body);

  const save_ledger = await new_ledger.save();

  return appStatus(201, save_ledger, req, res, next);
});

//get
const getLedger = tryCatch(async (req, res, next) => {
  const { bc } = req.query;
  console.log( bc);
  let get_all;
  if (bc) {
    console.log("1")
    get_all = await Ledger.find({ balance_type: "dr" }).select(
      " -createdAt -__v -updatedAt"
    );
  } else {
    console.log("2")
    get_all = await Ledger.find();
  }

  if (!get_all.length) {
    console.log("dsfsdf");
    return next(new NotFoundError("Empty"));
  }

  return appStatus(200, get_all, req, res, next);
});
// delete

const delLedger = tryCatch(async (req, res, next) => {
  const id = req.params.id;

  const del_ledger = await Ledger.findByIdAndDelete(id);
  if (!del_ledger) {
    return next(new BadRequestError("Ledger not found or already deleted"));
  }
  return appStatus(204, "", req, res, next);
});

// get bank & cash

// const bcLedger = tryCatch(async (req, res, next) => {
//   const { query } = req.query;
//   const ldName = query;
//   const bc_all = await Ledger.find({
//     $or: [{ ledger_name: "Cash" }, { ledger_name: "Bank" }],
//   }).select("-_id -creadtedAt -_v");

//   if (!bc_all.length) {
//     return next(
//       new NotFoundError("No ledgers found with the name 'Cash' or 'Bank'")
//     );
//   }

//   return appStatus(200, bc_all, req, res, next);
// });

module.exports = {
  addLedger,
  getLedger,
  delLedger,
};
