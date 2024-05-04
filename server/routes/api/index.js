const express = require("express");
const _ = express.Router();

const addAc = require("./openAcApi/openApi");
const newTran = require("./transaction/transApi");
_.use(
  "/open-ac",

  addAc
);
_.use(
  "/transaction",

  newTran
);
module.exports = _;
