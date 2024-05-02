const Account = require("../model/accountModel");
const tryCatch = require("../utils/tryCatch");
const appError = require("http-errors");
const newAcc = tryCatch(async (req, res, next) => {
  const data = req.body;

  const addAc = new Account(data);

  const saveAc = await addAc.save();
  if (!saveAc) {
    return;
  }
});
