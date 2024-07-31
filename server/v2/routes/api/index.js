const express = require("express");
const _ = express.Router();
const ledger = require("./ledger/ledgerApi");
const transaction = require("./transaction/transApi");

_.use("/ledger", ledger);
_.use("/transaction", transaction);
module.exports = _;
