const express = require("express");
const _ = express.Router();

const addAc = require("./openAcApi/openApi");
const newTran = require("./transaction/transApi");
const cashBk = require("./cashBook/cashbookApi");
_.use(
  "/open-ac",

  addAc
);
_.use(
  "/transaction",

  newTran
);
_.use("/cashbook", cashBk);
module.exports = _;
