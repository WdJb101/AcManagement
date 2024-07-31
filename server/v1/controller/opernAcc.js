const Account = require("../../model/accountModel");
const tryCatch = require("../../utils/tryCatch");
const appError = require("http-errors");
const appStatus = require("../../utils/appStatus");

// new Acc
const newAcc = tryCatch(async (req, res, next) => {
  const data = req.body;
  const findAc = await Account.findOne({ ac_name: data.ac_name });
  if (findAc) {
    return next(appError(400, "Try Again"));
  }
  const addAc = new Account(data);

  const saveAc = await addAc.save();
  if (!saveAc) {
    return next(appError(400, "Try Again"));
  }
  appStatus(201, "Done", saveAc, res);
});

//get By acc
const getByAcc = tryCatch(async (req, res, next) => {
  const { ac_name } = req.params;
  const findAc = await Account.findOne({ ac_name: ac_name });
  if (!findAc) {
    return next(appError(404, "Try Again"));
  }
  appStatus(200, "Ok", findAc, res);
});

module.exports = { newAcc, getByAcc };
